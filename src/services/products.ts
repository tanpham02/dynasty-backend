/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Product, ProductType } from '@app/models/products/@type';
import CRUDService from './crudService';
import { Model, Schema } from 'mongoose';
import CategoryModel from '@app/models/category';
import { Request } from 'express';
import { configApp } from '@app/configs';
import { FIELDS_NAME } from '@app/constants';
import { ProductVariants } from '@app/models/productVariants/@type';
import ProductVariantModel from '@app/models/productVariants';
import ProductVariantService from './productVariants';
import mongoose from 'mongoose';
import generateUnsignedSlug from '@app/utils/generateUnsignedSlug';

class ProductService extends CRUDService<Product> {
  constructor(model: Model<Product>, nameService: string) {
    super(model, nameService);
  }

  // DELETE
  async deleteOverriding(ids?: string[] | string | any) {
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

    return { message: `Delete ${this.nameService} success` };
  }

  // CREATE
  async createOverriding(req: Request) {
    const product: Product = JSON.parse(req.body?.[FIELDS_NAME.PRODUCT]);
    const filename = req.file?.filename;
    const destination = req.file?.destination;
    const productVariantListIds: Schema.Types.ObjectId[] = [];

    if (filename && destination) {
      product.image = `/${destination}/${filename}`;
    }

    const newProduct = new this.model({
      ...product,
      slug: generateUnsignedSlug(product?.name),
    });

    const productAttributeList: any[] = product?.productAttributeList || [];
    if (productAttributeList.length > 0) {
      const newProductVariant: any[] = productAttributeList.map(
        (attribute: {
          productAttributeItem: {
            attributeParentId: Schema.Types.ObjectId;
            name: string;
            value: string;
            priceAdjustment: string;
            priceAdjustmentValue: number;
          }[];
          extendedName: string;
          extendedValuePairs: string;
        }) => {
          const attributeItemValid = newProduct?.productAttributeList?.filter(
            (item) => item.extendedValuePairs?.includes(attribute?.extendedValuePairs),
          );

          let priceAdjustment = 0;
          if (attributeItemValid) {
            priceAdjustment = attribute.productAttributeItem.reduce((acc, next) => {
              const result = acc + (next?.priceAdjustmentValue || 0);
              return result;
            }, 0);
          }

          return {
            parentId: newProduct._id,
            productItem: {
              name: `${product.name} - ${attribute.extendedName}`,
              description: product.description,
              information: product.information,
              price: product.price + priceAdjustment,
              image: product?.image,
              types: product?.types,
              visible: product?.visible,
              productAttributeList: attributeItemValid,
              slug: generateUnsignedSlug(`${product.name} - ${attribute.extendedName}`),
            },
          };
        },
      );

      for (let i = 0; i < newProductVariant.length; i++) {
        const element = newProductVariant[i];
        (async () => {
          const newProductVariant = new ProductVariantModel(element);
          productVariantListIds.push(newProductVariant._id);
          await newProductVariant.save();
        })();
      }
      newProduct.productsVariant = productVariantListIds;
    }

    const categoryId = product.categoryId;
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
    const productRequest: Product = req.body?.[FIELDS_NAME.PRODUCT]
      ? JSON.parse(req.body?.[FIELDS_NAME.PRODUCT])
      : {};
    const filename = req?.file?.filename;
    const destination = req?.file?.destination;
    let dataUpdate: any = {
      parentId: id,
    };

    if (filename && destination) {
      productRequest.image = `/${destination}/${filename}`;
    }

    if (productRequest?.productAttributeList) {
      for (let i = 0; i < productRequest?.productAttributeList.length; i++) {
        const element: any = productRequest?.productAttributeList[i];

        const productVariantMatch = await ProductVariantModel.findOne({
          'productItem.productAttributeList._id': element?._id,
        });

        if (productVariantMatch) {
          dataUpdate = {
            ...dataUpdate,
            productItem: productRequest,
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

    await this.model.updateOne({ _id: id }, productRequest, { new: true });

    return { message: `Update ${this.nameService} success` };
  }

  // GET BY ID
  async getByIdOverriding(id: string) {
    const result = await this.getById(id).then((res) =>
      res.populate([
        {
          path: 'productsVariant',
          model: 'ProductVariant',
        },
        {
          path: 'attribute',
          model: 'ProductAttribute',
        },
      ]),
    );

    return result;
  }
}
export default ProductService;
