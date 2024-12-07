import { NextFunction, Request, Response } from 'express';

import { HttpStatusCode, Params } from '@app/types';
import { OverviewService } from '@app/services';

const overviewService = new OverviewService();

const OverViewController = {
  // SEARCH PAGINATION
  searchPagination: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex = 0, pageSize = 10, customerId, from, to, statusOrder, sortBy } = req.query;
    const params: Params = {
      customerId: customerId?.toString(),
      from: from?.toString(),
      to: to?.toString(),
      statusOrder: statusOrder?.toString(),
      pageIndex: Number(pageIndex),
      pageSize: Number(pageSize),
      sortBy: sortBy?.toString(),
    };
    try {
      const response = await overviewService.getOverViewByCriterial();
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },
};

export default OverViewController;
