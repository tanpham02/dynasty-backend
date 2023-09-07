import { Model } from 'mongoose';
import CRUDService from './crudService';
import ComboPromotions from '@app/models/comboPromotions/@type';
import { Filter, Params } from '@app/types';
import { Request } from 'express';
import CategoryModel from '@app/models/category';

class comboPromotionsService extends CRUDService<ComboPromotions> {
  constructor(model: Model<ComboPromotions>, nameService: string) {
    super(model, nameService);
  }

  async searchPagination(params: Params) {
    try {
      const { pageIndex, pageSize, name, categoryId } = params;

      const filter: Filter = {};

      if (name) {
        const patternWithName = { $regex: new RegExp(name, 'gi') };
        filter.name = patternWithName;
      }

      if (categoryId) {
        filter.categoryId = categoryId;
      }

      const data = await this.model
        .find(filter)
        .limit(pageSize)
        .skip(pageSize * pageIndex);
      const totalElement = await this.model.find(filter).count();
      const totalPages = Math.ceil(totalElement / pageSize);
      const isLastPage = pageIndex + 1 >= totalPages;
      const result = {
        data,
        totalElement,
        pageIndex,
        pageSize,
        totalPage: totalPages,
        isLastPage: isLastPage,
      };
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(`Error occur when fetching ${this.nameService} with error ${error}`);
    }
  }

  async createOverriding(req: Request) {
    try {
      const data: ComboPromotions = req.body;
      const combo = new this.model(data);
      if (data.categoryId) {
        await CategoryModel.findByIdAndUpdate(
          { _id: data.categoryId },
          {
            $push: { comboPromotionsId: combo._id },
          },
        );
      }
      return await combo.save();
    } catch (error) {
      console.log(error);
      throw new Error(`Error occur when create ${this.nameService} with error ${error}`);
    }
  }

  async deleteOverriding(ids: string[] | any) {
    try {
      await this.model.deleteMany({ _id: { $in: ids } });
      await CategoryModel.updateMany(
        { comboPromotionsId: { $in: ids } },
        {
          $pull: { comboPromotionsId: { $in: ids } },
        },
      );
      return { message: `Delete ${this.nameService} success` };
    } catch (error) {
      console.log(error);
      throw new Error(`Error occur when create ${this.nameService} with error ${error}`);
    }
  }
}

export default comboPromotionsService;
