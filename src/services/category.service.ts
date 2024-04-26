/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { Model } from 'mongoose';

import { FIELDS_NAME } from '@app/constants';
import Exception from '@app/exception';
import { ProductModel } from '@app/models';
import { CRUDService } from '@app/services';
import { Category, HttpStatusCode, TypeUpload } from '@app/types';
import { generateUnsignedSlug, handleUploadFile } from '@app/utils';

class CategoryService extends CRUDService<Category> {
  constructor(model: Model<Category>, serviceName: string) {
    super(model, serviceName);
  }

  // CREATE CATEGORY
  async createOverriding(req: Request) {
    const requestFormData = req?.body?.[FIELDS_NAME.CATEGORY]
      ? JSON.parse(req?.body?.[FIELDS_NAME.CATEGORY])
      : {};

    const fileUploads = handleUploadFile(req);

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

    if (fileUploads.length) {
      newCategory.set('avatar', fileUploads[0]);
    }

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

    const fileUploads = handleUploadFile(req);

    const alreadyExist = await this.getById(id);
    if (!alreadyExist) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, `Not found ${this.serviceName}!`);
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

    if (req.file) {
      categoryDetail.avatar = fileUploads[0];
    }

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

    return { message: `Update ${this.serviceName} success` };
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

    return { message: `Delete ${this.serviceName} success` };
  }
}

export default CategoryService;
