/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { Model, Schema } from 'mongoose';

import { FIELDS_NAME } from '@app/constants';
import Exception from '@app/exception';
import { CategoryModel, ProductAttributeModel, ProductVariantModel } from '@app/models';
import { CRUDService } from '@app/services';
import { HttpStatusCode, Product, ProductVariants, TypeUpload } from '@app/types';
import { comparingObjectId, generateUnsignedSlug, handleUploadFile } from '@app/utils';

class ProductService extends CRUDService<Product> {
  constructor(model: Model<Product>, serviceName: string) {
    super(model, serviceName);
  }

  // DELETE
  async deleteOverriding(ids?: string[] | string | any) {
    if (ids && Array.from(ids).length < 0) {
      const exception = new Exception(HttpStatusCode.BAD_REQUEST, 'ids field is required');
      throw exception;
    }

    await this.model.deleteMany({ _id: { $in: ids } });

    await CategoryModel.updateMany(
      {
        products: { $in: ids },
      },
      { $pull: { products: { $in: ids } } },
    );

    await CategoryModel.updateMany(
      {
        'childrenCategory.category.products': { $in: ids },
      },
      {
        $pull: {
          'childrenCategory.category.$.products': { $in: ids },
        },
      },
      {
        new: true,
      },
    );

    return { message: `Delete ${this.serviceName} success` };
  }

  // CREATE
  async createOverriding(req: Request) {
    const listFileUploads = handleUploadFile(req);

    const productBodyRequest: Product = JSON.parse(req.body?.[FIELDS_NAME.PRODUCT]);
    const productVariantListIds: Schema.Types.ObjectId[] = [];

    // if (req.files && Number(req.files?.length) > 0) {
    //   productBodyRequest.image = listFileUploads[0];
    //   productBodyRequest.images = listFileUploads;
    // }

    const newProduct = new this.model({
      ...productBodyRequest,
      slug: generateUnsignedSlug(productBodyRequest?.name),
    });

    const productAttributeList: any[] = productBodyRequest?.productAttributeList || [];
    // if (productAttributeList.length > 0) {
    //   const newProductVariant: any[] = productAttributeList.map(
    //     (attribute: {
    //       productAttributeItem: {
    //         attributeId: Schema.Types.ObjectId;
    //         priceAdjustmentValue: number;
    //       }[];
    //       extendedName: string;
    //       extendedValue: string;
    //     }) => {
    //       const attributeItemValid = newProduct?.productAttributeList?.find(
    //         (item) => item.extendedValue === attribute?.extendedValue,
    //       );

    //       let priceAdjustment = 0;
    //       if (attributeItemValid) {
    //         priceAdjustment = attribute.productAttributeItem.reduce((acc, next) => {
    //           const result = acc + (next?.priceAdjustmentValue || 0);
    //           return result;
    //         }, 0);
    //       }

    //       return {
    //         parentId: newProduct._id,
    //         productItem: {
    //           name: `${productBodyRequest.name} - ${attribute.extendedName}`,
    //           description: productBodyRequest.description,
    //           information: productBodyRequest.information,
    //           price: productBodyRequest.price + priceAdjustment,
    //           image: productBodyRequest?.image,
    //           images: productBodyRequest?.images,
    //           types: productBodyRequest?.types,
    //           visible: productBodyRequest?.visible,
    //           productAttributeList: [attributeItemValid],
    //           slug: generateUnsignedSlug(`${productBodyRequest.name} - ${attribute.extendedName}`),
    //         },
    //       };
    //     },
    //   );

    //   for (let i = 0; i < newProductVariant.length; i++) {
    //     const element = newProductVariant[i];
    //     (async () => {
    //       const newProductVariant = new ProductVariantModel(element);
    //       productVariantListIds.push(newProductVariant._id);
    //       await newProductVariant.save();
    //     })();
    //   }
    //   newProduct.productsVariant = productVariantListIds;
    // }

    const categoryId = productBodyRequest.categoryId;
    if (categoryId) {
      const category = await CategoryModel.findById(categoryId);

      const categoryChild = await CategoryModel.findOne({
        'childrenCategory.category._id': categoryId,
      });

      if (category) {
        await category.updateOne({ $push: { products: newProduct._id } });
      }

      if (categoryChild) {
        await CategoryModel.findOneAndUpdate(
          { 'childrenCategory.category._id': categoryId },
          {
            $push: {
              'childrenCategory.category.$.products': newProduct._id,
            },
          },
          {
            new: true,
          },
        );
      }
    }
    return await newProduct.save();
  }

  // UPDATE
  async updateOverriding(id: string, req: Request) {
    const listFileUploads = handleUploadFile(req);
    const productRequest: Product = req.body?.[FIELDS_NAME.PRODUCT]
      ? JSON.parse(req.body?.[FIELDS_NAME.PRODUCT])
      : {};
    let dataUpdate: any = {
      parentId: id,
    };
    // if (req.files && Number(req.files?.length) > 0) {
    //   productRequest.image = listFileUploads[0];
    //   productRequest.images = listFileUploads;

    //   const productVariants = ProductVariantModel.find({ parentId: id });
    //   const updateImageProductVariant = async (item: ProductVariants) => {
    //     await item.updateOne({
    //       $set: {
    //         'productItem.image': listFileUploads[0],
    //         'productItem.images': listFileUploads,
    //       },
    //     });
    //   };

    //   if (productVariants) {
    //     (await productVariants).forEach((item) => {
    //       updateImageProductVariant(item);
    //     });
    //   }
    // }

    if (productRequest?.price && !productRequest?.productAttributeList) {
      const productById = await this.getById(id);
      if (productById && productById?.productsVariant) {
        if (productById.price !== productRequest?.price) {
          for (let i = 0; i < productById.productsVariant.length; i++) {
            const productVariantObjectId = productById.productsVariant[i];
            (async () => {
              const productVariantById = await ProductVariantModel.findById(productVariantObjectId);
              const priceAdjustment =
                productVariantById?.productItem?.productAttributeList?.[0].productAttributeItem.reduce(
                  (acc, next) => {
                    return acc + (next?.priceAdjustmentValue || 0);
                  },
                  0,
                );
              if (productVariantById) {
                await productVariantById.updateOne({
                  $set: {
                    'productItem.price': productRequest.price + (priceAdjustment || 0),
                  },
                });
              }
            })();
          }
        }
      }
    }

    if (
      productRequest?.productAttributeList &&
      Array.from(productRequest.productAttributeList).length > 0
    ) {
      const attributeValid: any[] = [];
      for (let i = 0; i < productRequest?.productAttributeList.length; i++) {
        const element: any = productRequest?.productAttributeList[i];

        const productVariantMatch = await ProductVariantModel.findOne({
          'productItem.productAttributeList._id': element?._id,
        });

        if (productVariantMatch) {
          const priceAdjustment = Array.from(element?.productAttributeItem).reduce(
            (acc: any, next: any) => {
              return acc + (next?.priceAdjustmentValue || 0);
            },
            0,
          ) as any;

          productVariantMatch.productItem?.productAttributeList?.forEach((item) => {
            if (item.extendedValue === element?.extendedValue) {
              attributeValid.push(element);
            }
          });

          dataUpdate = {
            ...dataUpdate,
            parentId: id,
            productItem: {
              ...productRequest,
              name: `${
                productRequest?.name || productVariantMatch.productItem?.name.split('-')[0].trim()
              } - ${element?.extendedName}`,
              price:
                (productRequest?.price || productVariantMatch.productItem?.price) +
                (priceAdjustment || 0),
              slug: generateUnsignedSlug(
                `${
                  productRequest?.name || productVariantMatch.productItem?.name.split('-')[0].trim()
                } - ${element.extendedName}`,
              ),
              productAttributeList: attributeValid,
            },
          };

          await ProductVariantModel.updateOne(
            { 'productItem.productAttributeList._id': element?._id },
            dataUpdate,
            {
              new: true,
            },
          );
        }
      }
    }

    if (productRequest?.name) {
      productRequest.slug = generateUnsignedSlug(productRequest.name);
    }

    await this.model.updateOne({ _id: id }, productRequest, { new: true });
    return { message: `Update ${this.serviceName} success` };
  }

  // GET BY ID
  async getByIdOverriding(id: string) {
    const result = await this.getById(id);

    if (result && result.productAttributeList && result.productAttributeList?.length > 0) {
      for (const item of result.productAttributeList) {
        for (const attributeItem of item.productAttributeItem) {
          const attribute = await ProductAttributeModel.findOne({
            'attributeList._id': attributeItem.attributeId,
          });

          //   if (attribute) {
          //     const attributeChild = attribute.attributeList?.find((item: any) =>
          //       comparingObjectId(item._id, attributeItem.attributeId),
          //     );
          //     if (attributeChild) {
          //       attributeItem.attributeId = JSON.stringify(attributeChild) as any;
          //     }
          //   }
        }
      }
    }

    return await result.populate([
      {
        path: 'productsVariant',
        model: 'ProductVariant',
      },
      {
        path: 'attributeMapping',
        model: 'ProductAttribute',
      },
    ]);
  }
}
export default ProductService;
