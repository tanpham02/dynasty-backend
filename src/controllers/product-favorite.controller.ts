import { NextFunction, Request, Response } from 'express';

import { ProductFavoriteModel } from '@app/models';
import { ProductFavoriteService } from '@app/services';
import { HttpStatusCode, Params } from '@app/types';

const productFavoriteService = new ProductFavoriteService(ProductFavoriteModel, 'product favorite');

const productFavoriteController = {
  // SEARCH PAGINATION
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex = 0, pageSize = 10, name, sortBy, customerId } = req.query;
    try {
      const params: Params = {
        customerId: customerId?.toString(),
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize),
        name: name?.toString(),
        sortBy: sortBy?.toString(),
      };
      const response = await productFavoriteService.searchPagination(params);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error: any) {
      next(error);
    }
  },

  // UPDATE
  updateProductFavorite: async (req: Request, res: Response, next: NextFunction) => {
    const { customerId, productId } = req.query;
    try {
      const response = await productFavoriteService.updateProductFavorite(
        String(customerId),
        String(productId),
      );
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log('🚀 ~ file: banners.ts:37 ~ create: ~ error:', error);
      next(error);
    }
  },

  // DELETE
  deleteProductFavorite: async (req: Request, res: Response, next: NextFunction) => {
    const { customerId, productId } = req.query;
    try {
      const { message } = await productFavoriteService.deleteProductFavorite(
        String(customerId),
        String(productId),
      );
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default productFavoriteController;
