/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { Model } from 'mongoose';

import { FIELDS_NAME } from '@app/constants';
import Exception from '@app/exception';
import { ProductModel } from '@app/models';
import { CRUDService } from '@app/services';
import { Category, HttpStatusCode } from '@app/types';
import { generateUnsignedSlug, handleUploadFile } from '@app/utils';

class CategoryService extends CRUDService<Category> {
  constructor(model: Model<Category>, serviceName: string) {
    super(model, serviceName);
  }

  // CREATE CATEGORY
  async createCategory(req: Request) {
    const requestFormData = req.body?.[FIELDS_NAME.CATEGORY]
      ? JSON.parse(JSON.parse(JSON.stringify(req.body?.[FIELDS_NAME.CATEGORY])))
      : {};

    const fileUpload = handleUploadFile(req);

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

    if (fileUpload) {
      newCategory.set('avatar', fileUpload);
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
  async updateCategory(id: string, req: Request) {
    const requestFormData = req?.body?.[FIELDS_NAME.CATEGORY]
      ? JSON.parse(JSON.parse(JSON.stringify(req.body?.[FIELDS_NAME.CATEGORY])))
      : {};

    const fileUpload = handleUploadFile(req);

    const isAlreadyExist = await this.getById(id);
    if (!isAlreadyExist) {
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
      categoryDetail.avatar = fileUpload;
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

    return await this.model.findByIdAndUpdate({ _id: id }, categoryDetail, { new: true });
  }

  // GET BY ID
  async getCategoryById(id: string) {
    const category = (await this.getById(id)).populate([
      'products',
      `childrenCategory.category.products`,
    ]);

    if (!category) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Not found category');
      throw exception;
    }

    return category;
  }

  // DELETE CATEGORY
  async deleteCategory(ids: string[] | string | any) {
    await this.delete(ids);
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
