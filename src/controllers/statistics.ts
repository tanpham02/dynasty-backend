import { NextFunction, Request, Response } from 'express';
import {statisticCustomersService} from '@app/services/statistics'

const statisticController = {
  customers: async (req: Request, res: Response, next: NextFunction) => {
    try {
const result = await statisticCustomersService(req)
    } catch (error) {
      next(error);
    }
  },
};
