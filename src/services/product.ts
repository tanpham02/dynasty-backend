import { Product } from '@app/models/product/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import ProductVariantsModel from '@app/models/productVariant';
import CategoryModel from '@app/models/category';
import { Request } from 'express';
import { Filter, Params } from '@app/types';

class ProductService extends CRUDService<Product> {
  constructor(model: Model<Product>, nameService: string) {
    super(model, nameService);
  }

  async deleteOverriding(ids?: string[] | string | any) {
    try {
      await this.model.deleteMany({ _id: { $in: ids } });
      await ProductVariantsModel.updateMany(
        {
          productIds: { $in: ids },
        },
        { $pull: { productIds: { $in: ids } } },
      );

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
      throw new Error(`Occur error when delete ${this.nameService} with ${error}`);
    }
  }

  async createOverriding(req: Request) {
    const product: Product = req.body;
    try {
      const newProduct = new this.model(req.body);
      const productVariantId = product.productVariantId;
      const categoryId = product.categoryId;
      if (productVariantId) {
        const productVariant = await ProductVariantsModel.findById(productVariantId);
        await productVariant?.updateOne({ $push: { productIds: newProduct._id } });
      }
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
      throw new Error(`Occur error when delete ${this.nameService} with ${error}`);
    }
  }

  async updateOverriding(id: string, req: Request) {
    try {
      const productRequest: Product = req.body;
      const product = await this.model.findById(id);
      await product?.updateOne(productRequest, { new: true });

      const productVariantId = productRequest?.productVariantId;

      const categoryId = productRequest?.categoryId;
      const categoryChild = await CategoryModel.findOne({ 'childCategory._id': categoryId });

      if (
        productVariantId &&
        new Object(product?.productVariantId).valueOf() !== productVariantId
      ) {
        try {
          await ProductVariantsModel.findByIdAndUpdate(
            { _id: product?.productVariantId },
            {
              $pull: { productIds: product?._id },
            },
            { new: true },
          );

          await ProductVariantsModel.findByIdAndUpdate(
            { _id: productVariantId },
            {
              $push: { productIds: product?._id },
            },
            { new: true },
          );
        } catch (error) {
          console.log(error);
        }
      }

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
  async getByIdOverridingHavePopulate(id: string, populateName?: string | string[]) {
    try {
      let category;
      if (populateName) {
        if (Array.isArray(populateName)) {
          category = await this.model.findById(id).populate(populateName);
        } else {
          category = await this.model.findById(id).populate(populateName);
        }
      } else {
        category = await this.model.findById(id);
      }
      return category;
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when find by id ${this.nameService} with ${error}`);
    }
  }
}
export default ProductService;
