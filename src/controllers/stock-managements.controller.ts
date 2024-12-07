/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { StockManagementModel } from '@app/models';
import { StockManagementService } from '@app/services';
import { HttpStatusCode, Params } from '@app/types';

const stockManagementService = new StockManagementService(StockManagementModel, 'stock management');

const stockManagementController = {
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
        stockType,
      };
      const response = await stockManagementService.getPagination(params, ['stockManagementInfo']);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // CREATE
  createStockManagement: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await stockManagementService.createStockManagement(req);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // UPDATE
  updateStockManagement: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await stockManagementService.updateStockManagement(id, req);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // GET BY ID
  getStockManagementById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await stockManagementService.getById(id, ['stockManagementInfo']);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await stockManagementService.deleteStockManagement(id);
      res.status(200).json({ message: 'Delete stock management success' });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // INVOICE
  invoice: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await stockManagementService.invoiceExport(req);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },
};

export default stockManagementController;
