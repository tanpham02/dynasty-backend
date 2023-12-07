/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Product } from '@app/models/product/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import CategoryModel from '@app/models/category';
import { Request } from 'express';
import { configApp } from '@app/configs';

const { APP_URL } = configApp();
class ProductService extends CRUDService<Product> {
  constructor(model: Model<Product>, nameService: string) {
    super(model, nameService);
  }

  // DELETE
  async deleteOverriding(ids?: string[] | string | any) {
    try {
      await this.model.deleteMany({ _id: { $in: ids } });

      await CategoryModel.updateMany(
        {
          productsDTO: { $in: ids },
        },
        { $pull: { productsDTO: { $in: ids } } },
      );

      await CategoryModel.updateMany(
        {
          'childCategory.children.productsDTO': { $in: ids },
        },
        {
          $pull: {
            'childCategory.$.children.productsDTO': { $in: ids },
          },
        },
        {
          new: true,
        },
      );

      return { message: `Delete ${this.nameService} success` };
    } catch (error) {
      console.log(error);
      //throw new Error(`Occur error when delete ${this.nameService} with ${error}`); // on develop backend
      return error;
    }
  }

  // CREATE
  async createOverriding(req: Request) {
    const product: Product = JSON.parse(req.body.productInfo);
    const filename = req.file?.filename;
    const destination = req.file?.destination;

    if (filename && destination) {
      product.image = `${APP_URL}/${destination}/${filename}`;
    }
    
    try {
      const newProduct = new this.model({
        ...product,
      });
      const categoryId = product.categoryId;
      if (categoryId) {
        const category = await CategoryModel.findById(categoryId);
        const categoryChild = await CategoryModel.findOne({ 'childCategory._id': categoryId });
        if (category) {
          await category?.updateOne({ $push: { productsDTO: newProduct._id } });
        }
        if (categoryChild) {
          await CategoryModel.findOneAndUpdate(
            {
              'childCategory._id': categoryId,
            },
            {
              $push: {
                'childCategory.$.children.productsDTO': newProduct._id,
              },
            },
            {
              new: true,
            },
          );
        }
      }
      return await newProduct.save();
    } catch (error) {
      console.log(error);
      // throw new Error(`Occur error when delete ${this.nameService} with ${error}`); // on develop backend
      return error;
    }
  }

  // UPDATE
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
  async getByIdOverridingHavePopulate(id: string, populateName?: string) {
    try {
      let category;
      if (populateName) {
        category = await this.model
          .findById(id)
          .populate({ path: populateName, select: 'variants' });
      }
      return category;
    } catch (error) {
      //   console.log(error);
      throw new Error(`Occur error when find by id ${this.nameService} with ${error}`);
    }
  }
}
export default ProductService;
