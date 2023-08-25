import CRUDService from '@app/services/crudService';
import { Model } from 'mongoose';
import { Category } from '@app/models/category/@type';
import { Request } from 'express';

class CategoryService extends CRUDService<Category> {
  constructor(model: Model<Category>, nameService: String) {
    super(model, nameService);
  }

  //   // SEARCH PAGINATION CHILDREN CATEGORY
  //   async searchChildrenCategory(id: string) {
  //     try {
  //       const category = await this.model.findOne({ childCategory: { $in: id } });
  //       return category;
  //     } catch (error) {
  //       console.log(error);
  //       throw new Error(`Occur error when find by id ${this.nameService} with ${error}`);
  //     }
  //   }

  // GET CHILDREN CATEGORY BY ID
  async getChildrenCategoryById(id: string) {
    try {
      const childrenCategory = await this.model.findOne({
        childCategory: { $elemMatch: { _id: id } },
      });
      return childrenCategory;
      //   return childrenCategory?.childCategory?.find((child) => String(child._id) === id);
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when find by id ${this.nameService} with ${error}`);
    }
  }

  async updateChildrenCategory(id: string, req: Request) {
    try {
      const childrenCategory = await this.model.findOneAndUpdate(
        {
          'childCategory._id': id,
        },
        {},
        {},
      );

      childrenCategory?.childCategory?.find((child) => String(child._id) === id);
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when find by id ${this.nameService} with ${error}`);
    }
  }
}

export default CategoryService;
