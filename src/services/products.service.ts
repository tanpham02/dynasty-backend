/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { Model } from 'mongoose';

import { FIELDS_NAME } from '@app/constants';
import Exception from '@app/exception';
import { CategoryModel, ProductAttributeModel, ProductVariantModel } from '@app/models';
import { CRUDService } from '@app/services';
import { HttpStatusCode, Product, ProductVariants } from '@app/types';
import { generateUnsignedSlug, handleUploadFile } from '@app/utils';

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

    if (!productBodyRequest?.productAttributeList) productBodyRequest.haveProductVariant = false;

    const newProduct = new this.model({
      ...productBodyRequest,
      slug: generateUnsignedSlug(productBodyRequest?.name),
    });

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

    const groupedAttributes: any[] = productBodyRequest.productAttributeList
      ? productBodyRequest.productAttributeList?.map((attrList) => {
          const { extendedIds = [], priceAdjustmentValues = [] } = attrList;

          return {
            extendedDisplayName:
              extendedIds && extendedIds.length > 0
                ? mapExtendedIdsToExtendDisplayName(extendedIds).join(' - ')
                : undefined,
            extendedNames: mapExtendedIdsToExtendDisplayName(extendedIds),
            extendedIds,
            priceAdjustmentValues,
          };
        })
      : [{}];

    const productVariants: any = groupedAttributes.map((groupedAttribute, index) => {
      const priceAdjustment =
        groupedAttribute?.priceAdjustmentValues?.length > 0
          ? groupedAttribute.priceAdjustmentValues.reduce(
              (acc: any, next: any) => acc + (next ?? 0),
              0,
            )
          : 0;
      const productVariantName = groupedAttribute?.extendedDisplayName
        ? `${productBodyRequest.name} - ${groupedAttribute.extendedDisplayName}`
        : productBodyRequest.name;
      return {
        parentId: newProduct._id,
        productItem: {
          name: productVariantName,
          description: productBodyRequest?.description,
          information: productBodyRequest?.information,
          price: Number(productBodyRequest.price) + priceAdjustment,
          image: productBodyRequest?.image,
          images: productBodyRequest?.images,
          types: productBodyRequest?.types,
          visible: productBodyRequest?.visible || false,
          productAttributeList:
            productBodyRequest?.productAttributeList &&
            productBodyRequest.productAttributeList?.length > 0 &&
            Object.keys(productBodyRequest.productAttributeList[0]).length > 0 &&
            productBodyRequest.productAttributeList[0].extendedIds!.length > 0
              ? productBodyRequest.productAttributeList[index]
              : [],
          slug: generateUnsignedSlug(productVariantName),
          haveProductVariant: productBodyRequest.haveProductVariant,
        },
      };
    });

    const createNewProductVariant = async (productVariant: ProductVariants) => {
      const newProductVariant = new ProductVariantModel(productVariant);
      newProductVariant.productItem?.productAttributeList?.push(newProductVariant._id as any);
      productVariantListIds.push(newProductVariant._id);
      await newProductVariant.save();
    };

    for (let i = 0; i < productVariants.length; i++) {
      createNewProductVariant(productVariants[i]);
    }
    newProduct.productsVariant = productVariantListIds;

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

    if (!productBodyRequest?.productAttributeList) productBodyRequest.haveProductVariant = false;
    else productBodyRequest.haveProductVariant = true;

    const calculatePriceProductVariant = async (productVariant: ProductVariants) => {
      const priceAdjustment = productVariant.productItem!.productAttributeList![0]
        ?.priceAdjustmentValues
        ? productVariant.productItem!.productAttributeList![0].priceAdjustmentValues.reduce(
            (acc, next) => acc + (next ?? 0),
            0,
          )
        : 0;
      await productVariant.updateOne(
        {
          $set: {
            'productItem.price': Number(productBodyRequest.price) + priceAdjustment,
          },
        },
        { new: true },
      );
    };

    if (productBodyRequest?.price) {
      if (
        productBodyRequest?.productAttributeList &&
        productBodyRequest.productAttributeList.length > 0 &&
        productBodyRequest.haveProductVariant
      ) {
        const attributes = await ProductAttributeModel.find();

        const mapExtendedIdsToExtendDisplayName = (extendedIds: string[]) => {
          const extendedName: string[] = [];
          extendedIds.forEach((id) => {
            for (const category of attributes) {
              for (const attribute of category.attributeList!) {
                if (attribute._id?.toString() === id) {
                  extendedName.push(attribute.label!);
                }
              }
            }
            return null;
          });
          return extendedName.filter(Boolean);
        };

        const groupedAttributes = productBodyRequest.productAttributeList.map((attrList) => {
          const { extendedIds = [], priceAdjustmentValues = [] } = attrList;

          return {
            extendedDisplayName:
              extendedIds && extendedIds.length > 0
                ? mapExtendedIdsToExtendDisplayName(extendedIds).join(' - ')
                : undefined,
            extendedNames: mapExtendedIdsToExtendDisplayName(extendedIds),
            extendedIds,
            priceAdjustmentValues,
          };
        });

        productBodyRequest.productAttributeList = groupedAttributes;

        console.log(
          'productBodyRequest.productAttributeList',
          productBodyRequest.productAttributeList,
        );

        const productVariants: any[] = groupedAttributes.map((groupedAttribute) => {
          const priceAdjustment =
            groupedAttribute?.priceAdjustmentValues?.length > 0
              ? groupedAttribute.priceAdjustmentValues.reduce(
                  (acc: any, next: any) => acc + (next ?? 0),
                  0,
                )
              : 0;
          const productVariantName = groupedAttribute?.extendedDisplayName
            ? `${productBodyRequest.name} - ${groupedAttribute.extendedDisplayName}`
            : productBodyRequest.name;

          return {
            parentId: id,
            productItem: {
              name: productVariantName,
              description: productBodyRequest.description,
              information: productBodyRequest.information,
              price: Number(productBodyRequest.price) + priceAdjustment,
              types: productBodyRequest?.types,
              visible: productBodyRequest?.visible,
              productAttributeList: [],
              slug: generateUnsignedSlug(productVariantName),
              haveProductVariant: productBodyRequest.haveProductVariant,
            },
          };
        });

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
        productBodyRequest.productAttributeList = [];
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
      const childrenCategoryNotEquals = await CategoryModel.find({
        _id: productBodyRequest.categoryId,
      });

      if (childrenCategoryNotEquals && childrenCategoryNotEquals.length) {
        for (const category of childrenCategoryNotEquals) {
          if (
            category?.childrenCategory &&
            Object.keys(category.childrenCategory).length > 0 &&
            category.childrenCategory?.category
          ) {
            for (const cate of category.childrenCategory.category) {
              await category.updateOne(
                {
                  $pull: {
                    'childrenCategory.category.$[item].products': id,
                  },
                },
                {
                  arrayFilters: [
                    {
                      'item._id': cate._id,
                    },
                  ],
                  new: true,
                },
              );
            }
          }
        }
      }

      await CategoryModel.updateOne(
        { 'childrenCategory.category._id': productBodyRequest.categoryId },
        {
          $push: {
            'childrenCategory.category.$.products': id,
          },
        },
        {
          new: true,
        },
      );
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
