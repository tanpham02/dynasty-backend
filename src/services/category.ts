/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import CRUDService from '@app/services/crudService';
import { Model } from 'mongoose';
import { Category } from '@app/models/category/@type';
import ProductModel from '@app/models/product';
import { Request } from 'express';
import { HttpStatusCode } from '@app/exception/type';
import { Exception } from '@app/exception';
import { FIELDS_NAME } from '@app/constants';
import { page, pipe, skip } from 'iter-ops';
import { Product } from '@app/models/product/@type';
import generateUnsignedSlug from '@app/utils/generateSlug';

class CategoryService extends CRUDService<Category> {
  constructor(model: Model<Category>, nameService: string) {
    super(model, nameService);
  }

  // CREATE CATEGORY
  async createOverriding(req: Request) {
    const requestFormData = req?.body?.[FIELDS_NAME.CATEGORY]
      ? JSON.parse(req?.body?.[FIELDS_NAME.CATEGORY])
      : {};
    const newCategory = new this.model({
      ...requestFormData,
      slug: generateUnsignedSlug(requestFormData?.name),
    });
    const productIds = newCategory?.products;
    const childrenCategory = newCategory?.childrenCategory;
    if (productIds?.length) {
      await ProductModel.updateMany(
        {
          _id: { $in: productIds },
        },
        { $set: { categoryId: newCategory._id } },
      );
    }
    if (childrenCategory?.length) {
      for (let i = 0; i < childrenCategory.length; i++) {
        const element = childrenCategory[i];
        element.parentId = newCategory._id;
      }
    }
    return newCategory.save();
  }

  // GET BY ID
  async getCategoryById(id: string) {
    const category = await this.model
      .findOne({
        $or: [{ _id: id }, { 'childrenCategory._id': id }],
      })
      .populate(['products', `childrenCategory.category.products`]);

    if (!category) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Not found category');
      throw exception;
    }

    return category;
  }

  // DELETE CATEGORY
  async deleteOverriding(ids: string[] | string | any) {
    await this.model.deleteMany({ _id: { $in: ids } });
    await ProductModel.updateMany(
      {
        categoryId: { $in: ids },
      },
      { $set: { categoryId: null } },
    );

    return { message: `Delete ${this.nameService} success` };
  }
}

export default CategoryService;
