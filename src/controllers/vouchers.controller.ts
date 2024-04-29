/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { VoucherModel } from '@app/models';
import { VoucherService } from '@app/services';
import { HttpStatusCode, Params } from '@app/types';

const voucherService = new VoucherService(VoucherModel, 'voucher');

const voucherController = {
  // SEARCH PAGINATION VOUCHER
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex = 0, pageSize = 10, name, sortBy } = req.query;
    try {
      const params: Params = {
        name: name?.toString(),
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize),
        sortBy: sortBy?.toString(),
      };
      const voucher = await voucherService.getPagination(params);
      res.status(HttpStatusCode.OK).json(voucher);
    } catch (error: any) {
      next(error);
    }
  },

  // CREATE VOUCHER
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await voucherService.createOverriding(req);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      console.log('🚀 ~ file: voucher.ts:33 ~ create: ~ error:', error);
      next(error);
    }
  },

  // UPDATE VOUCHER
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await voucherService.update(id, req);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const voucher = await voucherService
        .getById(id)
        .then((res) => res?.populate('listProductUsedVoucher'));
      res.status(HttpStatusCode.OK).json(voucher);
    } catch (error) {
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ids } = req.query;
      const { message } = await voucherService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default voucherController;
