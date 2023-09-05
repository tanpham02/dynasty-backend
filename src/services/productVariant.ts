import { ProductVariants } from '@app/models/productVariant/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import { Params } from '@app/types';
import ProductModel from '@app/models/product';
import { Request } from 'express';

class ProductVariantService extends CRUDService<ProductVariants> {
  constructor(model: Model<ProductVariants>, nameService: string) {
    super(model, nameService);
  }

  // GET BY ID
  async getByIdOverridingHavePopulate(id: string, populateName?: string | string[]) {
    try {
      let category;
      if (populateName) {
        if (Array.isArray(populateName)) {
          category = await this.model
            .findById(id)
            .populate(populateName[0])
            .populate(populateName[1]);
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

  async createOverriding(req: Request) {
    try {
      const newProductVariant = new this.model(req.body);
      const listProductId = newProductVariant.productIds;
      if (listProductId?.length) {
        await ProductModel.updateMany(
          {
            _id: { $in: listProductId },
          },
          { $set: { productVariantId: newProductVariant._id } },
        );
      }

      return await newProductVariant.save();
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when delete ${this.nameService} with ${error}`);
    }
  }

  async deleteOverriding(ids?: string[] | string | any) {
    try {
      await this.model.deleteMany({ _id: { $in: ids } });
      await ProductModel.updateMany(
        {
          productVariantId: { $in: ids },
        },
        { $set: { productVariantId: null } },
      );

      return { message: `Delete ${this.nameService} success` };
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when delete ${this.nameService} with ${error}`);
    }
  }
}

export default ProductVariantService;
