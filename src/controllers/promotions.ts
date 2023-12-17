/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Exception } from '@app/exception';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import PromotionsModel from '@app/models/promotions';
import PromotionService from '@app/services/promotions';
import { Params } from '@app/types';
import { NextFunction, Request, Response } from 'express';

const promoService = new PromotionService(PromotionsModel, 'promotions');
const promotionController = {
  // SEARCH PAGINATION PROMOTIONS
  search: async (req: Request, res: Response) => {
    try {
      const { pageIndex, pageSize } = req.params;
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
      };
      const result = await promoService.getPagination(params);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error?.message);
    }
  },

  // CREATE PROMOTIONS
  create: async (req: Request, res: Response) => {
    try {
      const newPromotion = await promoService.create(req, '');
      res.status(HttpStatusCode.OK).json(newPromotion);
    } catch (error) {
      console.log('🚀 ~ file: promotions.ts:30 ~ create: ~ error:', error);
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // UPDATE PROMOTIONS
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { message } = await promoService.update(id, req, '');
      res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
      next(error);
    }
  },

  // GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const promotions = await promoService.getById(id);
      res.status(HttpStatusCode.OK).json(promotions);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      const { message } = await promoService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default promotionController;
