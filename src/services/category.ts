/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FIELDS_NAME } from '@app/constants';
import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';
import { Category } from '@app/models/category/@type';
import ProductModel from '@app/models/products';
import CRUDService from '@app/services/crudService';
import generateUnsignedSlug from '@app/utils/generateUnsignedSlug';
import { Request } from 'express';
import { Model } from 'mongoose';

class CategoryService extends CRUDService<Category> {
  constructor(model: Model<Category>, nameService: string) {
    super(model, nameService);
  }

  // CREATE CATEGORY
  async createOverriding(req: Request) {
    const requestFormData = req?.body?.[FIELDS_NAME.CATEGORY]
      ? JSON.parse(req?.body?.[FIELDS_NAME.CATEGORY])
      : {};

    if (
      requestFormData?.childrenCategory &&
      Object.keys(requestFormData.childrenCategory).length > 0
    ) {
      const childCategory = requestFormData?.childrenCategory;
      const resultChild = childCategory.category?.map((item: any) => ({
        ...item,
        slug: generateUnsignedSlug(item.name),
      }));

      childCategory.category = resultChild as unknown as any;
    }

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
    if (childrenCategory && Object.keys(childrenCategory).length > 0 && childrenCategory.category) {
      for (let i = 0; i < childrenCategory.category?.length; i++) {
        childrenCategory.parentId = newCategory._id;
      }
    }
    return newCategory.save();
  }

  // UPDATE CATEGORy
  async updateOverriding(id: string, req: Request) {
    const requestFormData = req?.body?.[FIELDS_NAME.CATEGORY]
      ? JSON.parse(req?.body?.[FIELDS_NAME.CATEGORY])
      : {};

    const alreadyExist = await this.getById(id);
    if (!alreadyExist) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, `Not found ${this.nameService}!`);
      throw exception;
    }

    if (
      requestFormData?.childrenCategory &&
      Object.keys(requestFormData.childrenCategory).length > 0
    ) {
      const childCategory = requestFormData?.childrenCategory;

      if (childCategory) {
        const resultChild = childCategory.category?.map((item: any) => ({
          ...item,
          slug: generateUnsignedSlug(item?.name),
        }));

        childCategory.category = resultChild as unknown as any;
        childCategory.parentId = new Object(requestFormData.childrenCategory.parentId);
      }
    }

    const categoryDetail = {
      ...requestFormData,
    };

    if (requestFormData?.name) {
      categoryDetail.slug = generateUnsignedSlug(requestFormData.name);
    }

    const productIds = categoryDetail?.products;
    await ProductModel.updateMany(
      {
        _id: { $in: productIds },
      },
      { $set: { categoryId: id } },
    );

    await this.model.findByIdAndUpdate({ _id: id }, categoryDetail, { new: true });

    return { message: `Update ${this.nameService} success` };
  }

  // GET BY ID
  async getCategoryById(id: string) {
    const category = await this.model
      .findOne({
        $or: [{ _id: id }, { 'childrenCategory.category._id': id }],
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
