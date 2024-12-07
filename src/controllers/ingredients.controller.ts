/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { IngredientModel, StockManagementModel } from '@app/models';
import { IngredientsService } from '@app/services';
import { HttpStatusCode, Params } from '@app/types';

const ingredientsService = new IngredientsService(IngredientModel, 'ingredients');

const ingredientController = {
  // SEARCH PAGINATION
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex = 0, pageSize = 10, from, to, sortBy, stockType } = req.query;
    try {
      const params: Params = {
        from: from?.toString(),
        to: to?.toString(),
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize),
        sortBy: sortBy?.toString(),
      };
      const response = await ingredientsService.getPagination(params);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },
};

export default ingredientController;
