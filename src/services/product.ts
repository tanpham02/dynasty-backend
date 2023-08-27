
import { Product } from '@app/models/product/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import ProductVariantsModel from '@app/models/productVariant';
import CategoryModel from '@app/models/category';
import { Request } from 'express';

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
        await category?.updateOne({ $push: { productsDTO: newProduct._id } });
      }

      return await newProduct.save();
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when delete ${this.nameService} with ${error}`);
    }
  }
}
export default ProductService;
