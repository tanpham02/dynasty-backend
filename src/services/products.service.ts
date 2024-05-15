/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { Model, Schema } from 'mongoose';

import { FIELDS_NAME } from '@app/constants';
import Exception from '@app/exception';
import { CategoryModel, ProductAttributeModel, ProductVariantModel } from '@app/models';
import { CRUDService } from '@app/services';
import { Category, HttpStatusCode, Product, ProductVariants } from '@app/types';
import { comparingObjectId, generateUnsignedSlug, handleUploadFile } from '@app/utils';

class ProductService extends CRUDService<Product> {
  constructor(model: Model<Product>, serviceName: string) {
    super(model, serviceName);
  }

  // DELETE
  async deleteProduct(ids?: string[] | string | any) {
    const idsValue = Array.isArray(ids) ? ids : [ids];
    if (ids && Array.from(ids).length < 0)
      throw new Exception(HttpStatusCode.BAD_REQUEST, 'ids field is required');

    await this.model.deleteMany({ _id: { $in: idsValue } }, { new: true });

    await ProductVariantModel.deleteMany({ parentId: { $in: idsValue } }, { new: true });

    await CategoryModel.updateMany(
      {
        products: { $in: idsValue },
      },
      { $pull: { products: { $in: idsValue } } },
      { new: true },
    );

    await CategoryModel.updateMany(
      {
        'childrenCategory.category.products': { $in: idsValue },
      },
      {
        $pull: {
          'childrenCategory.category.$.products': { $in: idsValue },
        },
      },
      {
        new: true,
      },
    );

    return { message: `Delete ${this.serviceName} success` };
  }

  // CREATE
  async createProduct(req: Request) {
    const fileUpload = handleUploadFile(req);

    const productBodyRequest: Product = req.body?.[FIELDS_NAME.PRODUCT]
      ? JSON.parse(JSON.parse(JSON.stringify(req.body?.[FIELDS_NAME.PRODUCT])))
      : {};
    const productVariantListIds: string[] = [];

    if (fileUpload) {
      productBodyRequest.image = fileUpload;
      productBodyRequest.images = [fileUpload];
    }

    const newProduct = new this.model({
      ...productBodyRequest,
      slug: generateUnsignedSlug(productBodyRequest?.name),
    });

    if (
      productBodyRequest?.productAttributeList &&
      productBodyRequest.productAttributeList.length > 0
    ) {
      const attributes = await ProductAttributeModel.find();

      const mapExtendedIdsToExtendDisplayName = (extendedIds: string[]) => {
        const extendedName: string[] = [];
        extendedIds.map((id) => {
          for (const category of attributes) {
            for (const attribute of category.attributeList!) {
              if (attribute._id?.toString() === id) {
                extendedName.push(attribute.label!);
              }
            }
          }
          return null;
        });
        return extendedName.filter((item) => item !== null);
      };

      const groupedAttributes = productBodyRequest.productAttributeList.map((attrList) => {
        const { extendedIds, priceAdjustmentValue = 0 } = attrList;

        return {
          extendedDisplayName: mapExtendedIdsToExtendDisplayName(extendedIds).join(' - '),
          extendedIds,
          priceAdjustmentValue: priceAdjustmentValue,
        };
      });

      const productVariants: any[] = groupedAttributes.map((groupedAttribute, index) => ({
        parentId: newProduct._id,
        productItem: {
          name: `${productBodyRequest.name} - ${groupedAttribute.extendedDisplayName}`,
          description: productBodyRequest.description,
          information: productBodyRequest.information,
          price: Number(productBodyRequest.price) + groupedAttribute.priceAdjustmentValue,
          image: productBodyRequest?.image,
          images: productBodyRequest?.images,
          types: productBodyRequest?.types,
          visible: productBodyRequest?.visible,
          productAttributeList: productBodyRequest.productAttributeList![index],
          slug: generateUnsignedSlug(
            `${productBodyRequest.name} - ${groupedAttribute.extendedDisplayName}`,
          ),
        },
      }));

      const createNewProductVariant = async (productVariant: ProductVariants) => {
        const newProductVariant = new ProductVariantModel(productVariant);
        productVariantListIds.push(newProductVariant._id);
        await newProductVariant.save();
      };

      for (let i = 0; i < productVariants.length; i++) {
        createNewProductVariant(productVariants[i]);
      }
      newProduct.productsVariant = productVariantListIds;
    }

    const categoryId = productBodyRequest?.categoryId;

    if (categoryId) {
      const category = await CategoryModel.findById(categoryId);

      const categoryChild = await CategoryModel.findOne({
        'childrenCategory.category._id': categoryId,
      });

      if (category) {
        await category.updateOne({ $push: { products: newProduct._id } });
      }

      if (categoryChild) {
        await categoryChild.updateOne(
          {
            $push: {
              'childrenCategory.category.$[item].products': newProduct._id,
            },
          },
          {
            new: true,
            arrayFilters: [
              {
                'item._id': categoryId,
              },
            ],
          },
        );
      }
    }
    return await newProduct.save();
  }

  // UPDATE
  async updateProduct(id: string, req: Request) {
    const fileUpload = handleUploadFile(req);

    const productBodyRequest: Product = req.body?.[FIELDS_NAME.PRODUCT]
      ? JSON.parse(JSON.parse(JSON.stringify(req.body?.[FIELDS_NAME.PRODUCT])))
      : {};

    const productVariantListIds: string[] = [];

    if (fileUpload) {
      productBodyRequest.image = fileUpload;
      productBodyRequest.images = [fileUpload];

      await ProductVariantModel.updateMany(
        { parentId: id },
        {
          $set: {
            'productItem.image': fileUpload,
            'productItem.images': [fileUpload],
          },
        },
        { new: true },
      );
    }

    const calculatePriceProductVariant = async (productVariant: ProductVariants) => {
      await productVariant.updateOne(
        {
          $set: {
            'productItem.price':
              productBodyRequest.price +
              (productVariant.productItem!.productAttributeList![0].priceAdjustmentValue || 0),
          },
        },
        { new: true },
      );
    };

    if (productBodyRequest?.price) {
      if (
        productBodyRequest?.productAttributeList &&
        productBodyRequest.productAttributeList.length > 0
      ) {
        const attributes = await ProductAttributeModel.find();

        const mapExtendedIdsToExtendDisplayName = (extendedIds: string[]) => {
          const extendedName: string[] = [];
          extendedIds.map((id) => {
            for (const category of attributes) {
              for (const attribute of category.attributeList!) {
                if (attribute._id?.toString() === id) {
                  extendedName.push(attribute.label!);
                }
              }
            }
            return null;
          });
          return extendedName.filter((item) => item !== null);
        };

        const groupedAttributes = productBodyRequest.productAttributeList.map((attrList) => {
          const { extendedIds, priceAdjustmentValue = 0 } = attrList;

          return {
            extendedDisplayName: mapExtendedIdsToExtendDisplayName(extendedIds).join(' - '),
            extendedIds,
            priceAdjustmentValue: priceAdjustmentValue,
          };
        });

        const productVariants: any[] = groupedAttributes.map((groupedAttribute, index) => ({
          parentId: id,
          productItem: {
            name: `${productBodyRequest.name} - ${groupedAttribute.extendedDisplayName}`,
            description: productBodyRequest.description,
            information: productBodyRequest.information,
            price: Number(productBodyRequest.price) + groupedAttribute.priceAdjustmentValue,
            types: productBodyRequest?.types,
            visible: productBodyRequest?.visible,
            productAttributeList: [],
            slug: generateUnsignedSlug(
              `${productBodyRequest.name} - ${groupedAttribute.extendedDisplayName}`,
            ),
          },
        }));

        const createNewProductVariant = async (productVariant: ProductVariants) => {
          const newProductVariant = new ProductVariantModel(productVariant);
          productVariantListIds.push(newProductVariant._id);
          await newProductVariant.save();
        };

        for (let i = 0; i < productVariants.length; i++) {
          createNewProductVariant(productVariants[i]);
        }
        productBodyRequest.productsVariant = productVariantListIds;
      } else {
        const productVariants = await ProductVariantModel.find({ parentId: id });

        if (productVariants && productVariants.length > 0) {
          for (const productVariant of productVariants) {
            calculatePriceProductVariant(productVariant);
          }
        }
      }
    }

    if (productBodyRequest?.categoryId) {
      // Cha
      await CategoryModel.updateMany(
        { _id: { $ne: productBodyRequest.categoryId } },
        {
          $pull: {
            products: id,
          },
        },
        { new: true },
      );
      await CategoryModel.updateOne(
        { _id: productBodyRequest.categoryId },
        {
          $push: {
            products: id,
          },
        },
        { new: true },
      );

      // Con
      //   await CategoryModel.updateOne(
      //     { 'childrenCategory.category._id': { $ne: productBodyRequest.categoryId } },
      //     {
      //       $pull: {
      //         'childrenCategory.category.$[item].products': id,
      //       },
      //     },
      //     {
      //       arrayFilters: [
      //         {
      //           'item._id': id,
      //         },
      //       ],
      //       new: true,
      //       multi: true,
      //     },
      //   );

      // BUG

      const childCategory = await CategoryModel.findOne({
        'childrenCategory.category._id': productBodyRequest._id,
      });
      if (childCategory) {
        await childCategory.updateOne(
          {
            $push: {
              childrenCategory: {
                'category.$[item].products': id,
              },
            },
          },
          {
            arrayFilters: [
              {
                'item._id': productBodyRequest._id,
              },
            ],
            new: true,
          },
        );
      }
      console.log('🚀 ~ ProductService ~ updateProduct ~ childCategory:', childCategory);
    }

    if (productBodyRequest?.name) {
      productBodyRequest.slug = generateUnsignedSlug(productBodyRequest.name);
    }

    return await this.model.updateOne({ _id: id }, productBodyRequest, { new: true });
  }

  // GET BY ID
  async getByIdProduct(id: string) {
    const result = await this.getById(id);

    return result.populate([
      {
        path: 'categoryId',
        model: 'Category',
      },
      {
        path: 'productsVariant',
        model: 'ProductVariant',
      },
    ]);
  }
}
export default ProductService;
