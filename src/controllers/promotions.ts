import PromotionsModel from '@app/models/promotions';
import PromotionService from '@app/services/promotions';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const promoService = new PromotionService(PromotionsModel, 'promotions');
const promotionController = {
  search: async (req: Request, res: Response) => {
    try {
      const { pageIndex, pageSize } = req.params;
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
      };
      const result = await promoService.getPagination(params);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const promotionsNew = await promoService.create(req);
      res.status(200).json(promotionsNew);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const promotions = await promoService.update(id, req);
      res.status(200).json(promotions);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const promotions = await promoService.getById(id);
      res.status(200).json(promotions);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  delete: async (req: Request, res: Response) => {
    const { ids } = req.query;
    try {
      const { message } = await promoService.delete(ids);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default promotionController;
