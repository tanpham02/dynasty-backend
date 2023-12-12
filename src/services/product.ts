/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Product, ProductType } from '@app/models/product/@type';
import CRUDService from './crudService';
import { Model, Schema } from 'mongoose';
import CategoryModel from '@app/models/category';
import { Request } from 'express';
import { configApp } from '@app/configs';
import { FIELDS_NAME } from '@app/constants';
import { ProductVariants } from '@app/models/productVariant/@type';
import ProductVariantModel from '@app/models/productVariant';
import ProductVariantService from './productVariant';
import mongoose from 'mongoose';
import generateUnsignedSlug from '@app/utils/generateSlug';

const { APP_URL } = configApp();

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
          const attributeItemValid = product.productAttributeList?.filter(
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
              image: product.image,
              types: product.types,
              visible: product.types,
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

  // UPDATE //!!!!!
  async updateOverriding(id: string, req: Request) {
    const productRequest: Product = req?.body?.productInfo
      ? JSON.parse(req?.body?.productInfo)
      : {};
    const filename = req?.file?.filename;
    const destination = req?.file?.destination;
    let dataUpdate: any = {};

    if (Object.keys(productRequest).length > 0) {
      dataUpdate = {
        ...dataUpdate,
        ...productRequest,
      };
    }
    try {
      if (filename && destination) {
        dataUpdate.image = `${APP_URL}/${destination}/${filename}`;
      }
      const product = await this.model.findOneAndUpdate({ _id: id }, dataUpdate, { new: true });

      const productVariantId = dataUpdate?.productVariantId;

      const categoryId = dataUpdate?.categoryId;
      const categoryChild = await CategoryModel.findOne({ 'childCategory._id': categoryId });

      if (categoryId && new Object(product?.categoryId).valueOf() !== categoryId) {
        console.log('category id');
        try {
          await CategoryModel.findByIdAndUpdate(
            { _id: product?.categoryId },
            {
              $pull: { productsDTO: product?._id },
            },
            { new: true },
          );

          await CategoryModel.findByIdAndUpdate(
            categoryId,
            {
              $push: { productsDTO: product?._id },
            },
            { new: true },
          );

          await CategoryModel.findOneAndUpdate(
            {
              'childCategory._id': product?.categoryId,
            },
            {
              $pull: {
                'childCategory.$.children.productsDTO': product?._id,
              },
            },
            {
              new: true,
            },
          );
        } catch (error) {
          console.log(error);
        }
      }

      if (categoryChild && new Object(product?.categoryId).valueOf() !== categoryChild) {
        try {
          await CategoryModel.findOneAndUpdate(
            {
              'childCategory._id': product?.categoryId,
            },
            {
              $pull: {
                'childCategory.$.children.productsDTO': product?._id,
              },
            },
            {
              new: true,
            },
          );

          await CategoryModel.findOneAndUpdate(
            {
              'childCategory._id': categoryId,
            },
            {
              $push: {
                'childCategory.$.children.productsDTO': product?._id,
              },
            },
            {
              new: true,
            },
          );

          await CategoryModel.findByIdAndUpdate(
            { _id: product?.categoryId },
            {
              $pull: { productsDTO: product?._id },
            },
            { new: true },
          );
        } catch (error) {
          console.log(error);
        }
      }
      return { message: `Update ${this.nameService} success` };
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when delete ${this.nameService} with ${error}`);
    }
  }

  // GET BY ID
  async getByIdOverriding(id: string) {
    const result = await this.getById(id).then((res) => res.populate('productsVariant'));

    return result;
  }
}
export default ProductService;
