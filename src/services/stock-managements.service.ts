/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { isEmpty, keyBy } from 'lodash';
import { Model } from 'mongoose';

import Exception from '@app/exception';
import { IngredientModel, IngredientSnapshotModel, StockManagementModel } from '@app/models';
import { CRUDService } from '@app/services';
import { HttpStatusCode, Ingredients, StockManagements, StockManagementTypes } from '@app/types';
import { comparingObjectId } from '@app/utils';

class StockManagementService extends CRUDService<StockManagements> {
  constructor(model: Model<StockManagements>, serviceName: string) {
    super(model, serviceName);
  }

  async invoiceExport(req: Request) {
    const requestBody = req.body as unknown as StockManagements;

    const ingredientIds = requestBody?.stockManagementInfo!.map((item) => item._id);
    const ingredients = await IngredientModel.find({ _id: { $in: ingredientIds } });
    if (!isEmpty(ingredients)) {
      const updates = ingredients?.map((item) => {
        const convertRequestBodyToObject = keyBy(requestBody.stockManagementInfo, '_id');

        if (!requestBody.isExported) {
          const quantity =
            item.quantity! - convertRequestBodyToObject[String(item._id).toString()].quantity!;
          item.originQuantity = item.quantity;
          item.quantity = quantity;
        }
        return item;
      });

      await Promise.all(
        updates!.map(async (item) => {
          if (item?.quantity === 0) {
            await IngredientModel.deleteOne({ _id: item._id }, { new: true });
          } else {
            await IngredientModel.updateOne(
              { _id: item._id },
              { $set: { ...item } },
              { new: true },
            );
          }
        }),
      );

      const currentDate = new Date();
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      endOfMonth.setHours(23, 59, 59, 999);

      await StockManagementModel.updateMany(
        {
          date: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
        {
          $set: { isExported: true },
        },
        { new: true },
      );

      const response = await StockManagementModel.findById(requestBody._id).populate(
        'stockManagementInfo',
      );
      return response;
    }

    return 'Ok';
  }

  // CREATE
  async createStockManagement(req: Request) {
    const bodyRequest: StockManagements = req.body;

    const totalPrice = bodyRequest.stockManagementInfo?.reduce((acc: any, next) => {
      if (next && next.price && next.quantity) {
        return acc + next.price * next.quantity;
      }
    }, 0);

    const ingredients = bodyRequest?.stockManagementInfo?.map((item) => ({
      ...item,
      price: Number(item.price),
      quantity: Number(item.quantity),
    }));

    delete bodyRequest?.stockManagementInfo;

    const newStockManagement = new this.model({
      ...bodyRequest,
      totalPrice,
    });

    await newStockManagement.save();
    let ingredientIds: string[] = [];
    if (!isEmpty(ingredients)) {
      let ingredientResponse: Ingredients[] = [];
      if (bodyRequest.type === StockManagementTypes.IMPORT) {
        ingredientResponse = await IngredientModel.insertMany(ingredients);
      } else {
        ingredientResponse = await IngredientSnapshotModel.insertMany(ingredients);
      }
      ingredientIds = ingredientResponse?.map((item) => item._id.toString())?.filter(Boolean);
    }

    newStockManagement.stockManagementInfo = ingredientIds as unknown as Ingredients[];
    await newStockManagement.save();
    return newStockManagement;
  }

  // UPDATE
  async updateStockManagement(id: string, req: Request) {
    const bodyRequest: StockManagements = req.body;
    const stockManagementDetail = await this.getById(id);

    if (!stockManagementDetail)
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Not found stock management');

    const totalPrice = bodyRequest.stockManagementInfo
      ?.filter((item) => !item?.shouldDelete)
      ?.reduce((acc: any, next) => {
        if (next && next.price && next.quantity) {
          return acc + next.price * next.quantity;
        }
      }, 0);

    const dateUpdate = { ...bodyRequest, totalPrice };

    if (bodyRequest?.date) {
      dateUpdate.date = new Date();
    }

    const ingredientIds = bodyRequest?.stockManagementInfo
      ?.map((item) => item._id)
      ?.filter(Boolean);

    const updates = bodyRequest?.stockManagementInfo?.filter(
      (item) => ingredientIds?.includes(item._id) && !item?.shouldDelete,
    );

    const deleteIds = bodyRequest?.stockManagementInfo
      ?.filter((item) => item?.shouldDelete)
      ?.map((item) => item?._id);

    const isImportMode = bodyRequest.type === StockManagementTypes.IMPORT;
    const CurrentModel = isImportMode ? IngredientModel : IngredientSnapshotModel;

    if (!isEmpty(updates)) {
      await Promise.all(
        updates!.map((item) =>
          CurrentModel.updateOne({ _id: item._id }, { $set: { ...item } }, { new: true }),
        ),
      );
      await CurrentModel.deleteMany({
        _id: {
          $in: deleteIds,
        },
      });
      await this.delete(deleteIds);
    }

    const creates = bodyRequest?.stockManagementInfo
      ?.filter((item) => !item._id && !item?.shouldDelete)
      ?.map((item) => ({ ...item, price: Number(item.price), quantity: Number(item.quantity) }));

    if (!isEmpty(creates)) {
      const ingredientResponse = await CurrentModel.insertMany(creates);

      dateUpdate.stockManagementInfo = ingredientIds?.concat(
        ingredientResponse?.map((item) => item._id.toString())?.filter(Boolean),
      );
    }

    await stockManagementDetail.updateOne(dateUpdate, { new: true });

    return { message: 'Update stock management success' };
  }

  // DELETE
  async deleteStockManagement(stockManagementId: string) {
    const stockManagement = await this.model.findOne({
      $or: [{ _id: stockManagementId }, { 'stockManagementInfo._id': stockManagementId }],
    });

    if (!stockManagement) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Not found stockManagement');
      throw exception;
    }

    if (comparingObjectId(stockManagementId, stockManagement._id)) {
      return await this.model.findOneAndDelete({ _id: stockManagementId });
    }

    return await this.model.findOneAndUpdate(
      { 'stockManagementInfo._id': stockManagementId },
      {
        $pull: { stockManagementInfo: { _id: stockManagementId } },
      },
      { new: true },
    );
  }
}

export default StockManagementService;
