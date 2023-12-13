/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ProductVariants } from '@app/models/productVariant/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import ProductModel from '@app/models/product';
import { Request } from 'express';
import { HttpStatusCode } from '@app/exception/type';
import { Exception } from '@app/exception';
import generateUnsignedSlug from '@app/utils/generateSlug';

class ProductVariantService extends CRUDService<ProductVariants> {
  constructor(model: Model<ProductVariants>, nameService: string) {
    super(model, nameService);
  }

  // UPDATE
  async updateOverriding(id: string, req: Request, fieldName: string) {
    const dataUpdate = req?.body?.[fieldName] ? JSON.parse(req?.body?.[fieldName]) : {};

    const alreadyExist = await this.getById(id);

    if (!Object.keys(fieldName)?.length) {
      const exception = new Exception(HttpStatusCode.BAD_REQUEST, "Request body can't be empty");
      throw exception;
    }

    if (!alreadyExist) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, `Not found ${this.nameService}!`);
      throw exception;
    }

    if (dataUpdate?.productItem?.name) {
      dataUpdate.productItem.slug = generateUnsignedSlug(dataUpdate.productItem.name);
    }

    await this.model.findByIdAndUpdate({ _id: id }, dataUpdate, { new: true });

    return { message: `Update ${this.nameService} success` };
  }

  // DELETE
  async deleteOverriding(ids: string[]) {
    const { message } = await this.delete(ids);

    await ProductModel.updateMany(
      {
        productsVariant: { $in: ids },
      },
      { $pull: { productsVariant: { $in: ids } } },
    );

    return { message };
  }
}

export default ProductVariantService;
