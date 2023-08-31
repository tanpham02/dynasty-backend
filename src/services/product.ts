import { Product } from '@app/models/product/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import ProductVariantsModel from '@app/models/productVariant';
import CategoryModel from '@app/models/category';
import { Request } from 'express';
import CategoryService from './category';

interface ArrayString {
  productDTO: string[];
}

const categoryService = new CategoryService(CategoryModel, 'category');
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
    const productRequest: Product = req.body;
    try {
      const product = await this.model.findById(id);
      const productUpdate = await product?.updateOne(productRequest, { new: true });

      const productVariantId = productRequest.productVariantId;

      console.log('====================',new Object(product?.productVariantId).valueOf() !== productVariantId)

      const categoryId = productRequest.categoryId;
      const categoryChild = await CategoryModel.findOne({ 'childCategory._id': categoryId });

      //   if (categoryId && convertCategoryId !== categoryId) {
      //     const categoryBefore = await CategoryModel.findById(productUpdate?.categoryId);
      //     await categoryBefore?.updateOne({ $pull: { productsDTO: productUpdate?._id } });

      //     const productVariantAfter = await CategoryModel.findById(categoryId);
      //     await productVariantAfter?.updateOne({ $push: { productsDTO: productUpdate?._id } });
      //   }

      if (
        productVariantId &&
        new Object(product?.productVariantId).valueOf() !== productVariantId
      ) {
        await ProductVariantsModel.findByIdAndUpdate(
          product?.productVariantId,
          {
            $pull: { productIds: product?._id },
          },
          { new: true },
        );

        await ProductVariantsModel.findByIdAndUpdate(
          productVariantId,
          {
            $push: { productIds: productUpdate?._id },
          },
          { new: true },
        );
      }
      if (categoryId) {
        if (new Object(product?.categoryId).valueOf() !== categoryId) {
          const categoryBefore = await CategoryModel.findById(product?.categoryId);
          await categoryBefore?.updateOne({ $pull: { productsDTO: product?._id } }, { new: true });

          await CategoryModel.findByIdAndUpdate(
            categoryId,
            {
              $push: { productsDTO: productUpdate?._id },
            },
            { new: true },
          );
        }
      }
      if (categoryChild) {
        if (new Object(product?.categoryId).valueOf() !== categoryChild)
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
              'childCategory.$.children.productsDTO': productUpdate?._id,
            },
          },
          {
            new: true,
          },
        );
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when delete ${this.nameService} with ${error}`);
    }
  }
}
export default ProductService;
