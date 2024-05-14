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
    console.log('🚀 ~ ProductService ~ deleteProduct ~ ids:', ids);
    const idsValue = Array.isArray(ids) ? ids : [ids];
    if (ids && Array.from(ids).length < 0) {
      const exception = new Exception(HttpStatusCode.BAD_REQUEST, 'ids field is required');
      throw exception;
    }

    await this.model.deleteMany({ _id: { $in: idsValue } });

    await CategoryModel.updateMany(
      {
        products: { $in: idsValue },
      },
      { $pull: { products: { $in: idsValue } } },
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
  //   async updateProduct(id: string, req: Request) {
  //     const fileUpload = handleUploadFile(req);

  //     const productRequest: Product = req.body?.[FIELDS_NAME.PRODUCT]
  //       ? JSON.parse(JSON.parse(JSON.stringify(req.body?.[FIELDS_NAME.PRODUCT])))
  //       : {};
  //     let dataUpdate: any = {
  //       parentId: id,
  //     };
  //     if (fileUpload) {
  //       productRequest.image = fileUpload;
  //       productRequest.images = [fileUpload];

  //       const productVariants = ProductVariantModel.find({ parentId: id });
  //       const updateImageProductVariant = async (item: ProductVariants) => {
  //         await item.updateOne({
  //           $set: {
  //             'productItem.image': fileUpload,
  //             'productItem.images': [fileUpload],
  //           },
  //         });
  //       };

  //       if (productVariants) {
  //         (await productVariants).forEach((item) => {
  //           updateImageProductVariant(item);
  //         });
  //       }
  //     }

  //     if (productRequest?.price && !productRequest?.productAttributeList) {
  //       const productById = await this.getById(id);
  //       if (productById && productById?.productsVariant) {
  //         if (productById.price !== productRequest?.price) {
  //           for (let i = 0; i < productById.productsVariant.length; i++) {
  //             const productVariantObjectId = productById.productsVariant[i];
  //             (async () => {
  //               const productVariantById = await ProductVariantModel.findById(productVariantObjectId);
  //               const priceAdjustment =
  //                 productVariantById?.productItem?.productAttributeList?.[0].productAttributeItem.reduce(
  //                   (acc, next) => {
  //                     return acc + (next?.priceAdjustmentValue || 0);
  //                   },
  //                   0,
  //                 );
  //               if (productVariantById) {
  //                 await productVariantById.updateOne({
  //                   $set: {
  //                     'productItem.price': productRequest.price + (priceAdjustment || 0),
  //                   },
  //                 });
  //               }
  //             })();
  //           }
  //         }
  //       }
  //     }

  //     if (
  //       productRequest?.productAttributeList &&
  //       Array.from(productRequest.productAttributeList).length > 0
  //     ) {
  //       const attributeValid: any[] = [];
  //       for (let i = 0; i < productRequest?.productAttributeList.length; i++) {
  //         const element: any = productRequest?.productAttributeList[i];

  //         const productVariantMatch = await ProductVariantModel.findOne({
  //           'productItem.productAttributeList._id': element?._id,
  //         });

  //         if (productVariantMatch) {
  //           const priceAdjustment = Array.from(element?.productAttributeItem).reduce(
  //             (acc: any, next: any) => {
  //               return acc + (next?.priceAdjustmentValue || 0);
  //             },
  //             0,
  //           ) as any;

  //           productVariantMatch.productItem?.productAttributeList?.forEach((item) => {
  //             if (item.extendedValue === element?.extendedValue) {
  //               attributeValid.push(element);
  //             }
  //           });

  //           dataUpdate = {
  //             ...dataUpdate,
  //             parentId: id,
  //             productItem: {
  //               ...productRequest,
  //               name: `${
  //                 productRequest?.name || productVariantMatch.productItem?.name.split('-')[0].trim()
  //               } - ${element?.extendedName}`,
  //               price:
  //                 (productRequest?.price || productVariantMatch.productItem?.price) +
  //                 (priceAdjustment || 0),
  //               slug: generateUnsignedSlug(
  //                 `${
  //                   productRequest?.name || productVariantMatch.productItem?.name.split('-')[0].trim()
  //                 } - ${element.extendedName}`,
  //               ),
  //               productAttributeList: attributeValid,
  //             },
  //           };

  //           await ProductVariantModel.updateOne(
  //             { 'productItem.productAttributeList._id': element?._id },
  //             dataUpdate,
  //             {
  //               new: true,
  //             },
  //           );
  //         }
  //       }
  //     }

  //     if (productRequest?.name) {
  //       productRequest.slug = generateUnsignedSlug(productRequest.name);
  //     }

  //     return await this.model.updateOne({ _id: id }, productRequest, { new: true });
  //   }

  // GET BY ID
  async getByIdProduct(id: string) {
    // const result = await this.getById(id);

    // if (result && result.productAttributeList && result.productAttributeList?.length > 0) {
    //   for (const item of result.productAttributeList) {
    //     for (const attributeItem of item.productAttributeItem) {
    //       const attribute = await ProductAttributeModel.findOne({
    //         'attributeList._id': attributeItem.attributeId,
    //       });

    //       if (attribute) {
    //         const attributeChild = attribute.attributeList?.find(
    //           (item: any) =>
    //             attributeItem.attributeId && comparingObjectId(item._id, attributeItem.attributeId),
    //         );
    //         if (attributeChild) {
    //           attributeItem.attributeId = JSON.stringify(attributeChild) as any;
    //         }
    //       }
    //     }
    //   }
    // }

    return (await this.getById(id)).populate([
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
