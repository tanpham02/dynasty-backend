/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { Model } from 'mongoose';

import { FIELDS_NAME } from '@app/constants';
import Exception from '@app/exception';
import { ProductModel } from '@app/models';
import { CRUDService } from '@app/services';
import { Category, HttpStatusCode } from '@app/types';
import { generateUnsignedSlug, handleUploadFile } from '@app/utils';
import { isEmpty } from 'lodash';

class CategoryService extends CRUDService<Category> {
  constructor(model: Model<Category>, serviceName: string) {
    super(model, serviceName);
  }

  // CREATE CATEGORY
  async createCategory(req: Request) {
    const requestFormData: Category = req.body?.[FIELDS_NAME.CATEGORY]
      ? JSON.parse(JSON.parse(JSON.stringify(req.body?.[FIELDS_NAME.CATEGORY])))
      : {};

    const fileUpload = handleUploadFile(req);

    if (
      requestFormData?.childrenCategory &&
      Object.keys(requestFormData.childrenCategory).length > 0
    ) {
      const childCategoryRequestBody = requestFormData?.childrenCategory;
      const childrenCategory = childCategoryRequestBody.category?.map((item: any) => ({
        ...item,
        slug: generateUnsignedSlug(item.name),
      }));

      childCategoryRequestBody.category = childrenCategory;
    }

    if (fileUpload) {
      requestFormData.avatar = fileUpload;
    }

    const newCategory = new this.model({
      ...requestFormData,
      slug: generateUnsignedSlug(requestFormData?.name),
    });

    if (
      requestFormData?.childrenCategory &&
      !isEmpty(requestFormData?.childrenCategory) &&
      !requestFormData?.childrenCategory?.parentId
    ) {
      newCategory.childrenCategory!.parentId = newCategory._id;
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
    if (!isAlreadyExist)
      throw new Exception(HttpStatusCode.NOT_FOUND, `Not found ${this.serviceName}!`);

    if (
      requestFormData?.childrenCategory &&
      Object.keys(requestFormData.childrenCategory).length > 0
    ) {
      const childCategoryRequestBody = requestFormData?.childrenCategory;

      if (childCategoryRequestBody) {
        const childrenCategory = childCategoryRequestBody.category?.map((item: any) => ({
          ...item,
          slug: generateUnsignedSlug(item?.name),
        }));

        childCategoryRequestBody.category = childrenCategory;
        childCategoryRequestBody.parentId = new Object(requestFormData.childrenCategory.parentId);
      }
    }

    if (req.file) {
      requestFormData.avatar = fileUpload;
    }

    if (requestFormData?.name) {
      requestFormData.slug = generateUnsignedSlug(requestFormData.name);
    }

    const productIds = requestFormData?.products;
    await ProductModel.updateMany(
      {
        _id: { $in: productIds },
      },
      { $set: { categoryId: id } },
    );

    return await this.model.findByIdAndUpdate({ _id: id }, requestFormData, { new: true });
  }

  // GET BY ID
  async getCategoryById(id: string) {
    const category = (await this.getById(id)).populate([
      'products',
      `childrenCategory.category.products`,
    ]);

    if (!category)
      throw new Exception(HttpStatusCode.NOT_FOUND, `Not found category with id ${id}`);

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
