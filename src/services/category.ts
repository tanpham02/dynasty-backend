import CRUDService from '@app/services/crudService';
import { Model } from 'mongoose';
import { Category } from '@app/models/category/@type';
import ProductModel from '@app/models/product';
import { Request } from 'express';

class CategoryService extends CRUDService<Category> {
  constructor(model: Model<Category>, nameService: String) {
    super(model, nameService);
  }

  // CREATE CATEGORY
  async createOverriding(req: Request) {
    try {
      const newCategory = new this.model(req.body);
      const listProductId = newCategory.productsDTO;
      const childListProductId = newCategory.childCategory;
      if (childListProductId?.length) {
        for (let i = 0; i < childListProductId.length; i++) {
          const element = childListProductId[i];
          const handleUpdateCategoryIdFromProductDTO = async () => {
            await ProductModel.updateMany(
              {
                _id: { $in: element.productsDTO },
              },
              { $set: { categoryId: element._id } },
            );
          };
          handleUpdateCategoryIdFromProductDTO();
        }
      }
      if (listProductId?.length) {
        await ProductModel.updateMany(
          {
            _id: { $in: listProductId },
          },
          { $set: { categoryId: newCategory._id } },
        );
      }
      await newCategory.save();
      return newCategory;
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when delete ${this.nameService} with ${error}`);
    }
  }

  // DELETE CATEGORY
  async deleteOverriding(ids: string[] | string | any) {
    try {
      await this.model.deleteMany({ _id: { $in: ids } });
      await ProductModel.updateMany(
        {
          categoryId: { $in: ids },
        },
        { $set: { categoryId: null } },
      );
      return { message: `Delete ${this.nameService} success` };
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when delete ${this.nameService} with ${error}`);
    }
  }

  // GET CHILDREN CATEGORY BY ID
  async getChildrenCategoryById(childCategoryId: string | any, populateName?: string | string[]) {
    try {
      const childrenCategory = await this.model.findOne({
        childCategory: { $elemMatch: { _id: childCategoryId } },
      });
      const result = childrenCategory?.childCategory?.find(
        (child) => String(child._id) === childCategoryId,
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when find by id ${this.nameService} with ${error}`);
    }
  }

  // DELETE CHILDREN CATEGORY
  async deleteChildCategoryOverriding(
    parentCategoryId: string | any,
    childCategoryId: string | string[] | any,
  ) {
    try {
      const category = await this.model.findById(parentCategoryId);
      await category?.updateOne({ $pull: { childCategory: { _id: childCategoryId } } });
      await ProductModel.updateMany(
        {
          categoryId: childCategoryId,
        },
        { $set: { categoryId: null } },
      );
      return { message: `Delete ${this.nameService} success` };
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when delete ${this.nameService} with ${error}`);
    }
  }

  // UPDATE CHILDREN CATEGORY
  async updateChildrenCategory(childCategoryId: string | any, req: Request) {
    try {
      const filter = {
        'childCategory._id': childCategoryId,
      };

      const update: any = { $set: {} };
      for (const field in req.body) {
        update.$set[`childCategory.$.${field}`] = req.body[field];
      }

      const result = await this.model.updateOne(filter, update);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when find by id ${this.nameService} with ${error}`);
    }
  }

  // ADD CHILDREN CATEGORY
  async addChildrenCategory(parentCategoryId: string | any, req: Request) {
    try {
      await this.model.findByIdAndUpdate(
        { _id: parentCategoryId },
        {
          $push: { childCategory: req.body },
        },
        { new: true },
      );
      const category = await this.model.findById(parentCategoryId);

      const categoryId = category?.childCategory?.[category?.childCategory.length - 1]._id;
      const productListId = req.body.productsDTO;
      if (productListId) {
        await ProductModel.updateMany(
          {
            _id: { $in: productListId },
          },
          {
            $set: {
              categoryId: categoryId,
            },
          },
        );
      }
      return { message: `Add ${this.nameService} success` };
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when delete ${this.nameService} with ${error}`);
    }
  }
}

export default CategoryService;
