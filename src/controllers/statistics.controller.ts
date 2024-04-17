import { HttpStatusCode } from '@app/exception/type';
import StatisticService from '@app/services/statistics/statisticCustomers';
import { NextFunction, Request, Response } from 'express';

const statisticService = new StatisticService();

const statisticController = {
  customers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await statisticService.customers(req);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  },
  orders: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await statisticService.orders(req);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  },
};

export default statisticController;
