import { StatisticModel } from '@app/models/statistics';
import { NextFunction, Request, Response } from 'express';
import { statisticCustomersService } from '@app/services/statistics';
import { HttpStatusCode } from '@app/exception/type';
import StatisticService from '@app/services/statistics/statisticCustomers';

const statisticService = new StatisticService();

export const statisticController = {
  customers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await statisticService.customer(req);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  },
};
