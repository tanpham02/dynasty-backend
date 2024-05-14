/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { ProductVariantModel } from '@app/models';
import { ProductVariantService } from '@app/services';
import { HttpStatusCode, Params } from '@app/types';

const productVariantService = new ProductVariantService(ProductVariantModel, 'product variant');

const productVariantController = {
  //SEARCH PAGINATION
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex = 0, pageSize = 10 } = req.query;
    try {
      const params: Params = {
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize),
      };
      const product = await productVariantService.getPagination(params);
      res.status(HttpStatusCode.OK).json(product);
    } catch (error) {
      next(error);
    }
  },
};

export default productVariantController;
