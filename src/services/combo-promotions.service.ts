import CategoryModel from '@app/models/category.model';
import ComboPromotions from '@app/types/combo-promotions.type';
import { Request } from 'express';
import { Model } from 'mongoose';
import CRUDService from './CRUD.service';

class ComboPromotionsService extends CRUDService<ComboPromotions> {
  constructor(model: Model<ComboPromotions>, nameService: string) {
    super(model, nameService);
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

export default ComboPromotionsService;
