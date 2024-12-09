import { NextFunction, Request, Response } from 'express';

import { HttpStatusCode, Params } from '@app/types';
import { OverviewService } from '@app/services';

const overviewService = new OverviewService();

const OverViewController = {
  getOverview: async (req: Request, res: Response, next: NextFunction) => {
    const { from, to } = req.query;
    const params: Params = {
      from: from?.toString(),
      to: to?.toString(),
    };
    try {
      const response = await overviewService.getOverViewByCriterial(params);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },
  getRevenueChart: async (req: Request, res: Response, next: NextFunction) => {
    const { from, to } = req.query;
    const params: Params = {
      from: from?.toString(),
      to: to?.toString(),
    };
    try {
      const response = await overviewService.getRevenueChart(params);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },
  getFiveProductsBestSelling: async (req: Request, res: Response, next: NextFunction) => {
    const { from, to } = req.query;
    const params: Params = {
      from: from?.toString(),
      to: to?.toString(),
    };
    try {
      const response = await overviewService.getFiveProductsBestSelling(params);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },
};

export default OverViewController;
