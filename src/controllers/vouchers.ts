/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Exception } from '@app/exception';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import VoucherModel from '@app/models/vouchers';
import VoucherService from '@app/services/vouchers';
import { Params } from '@app/types';
import { NextFunction, Request, Response } from 'express';

const voucherService = new VoucherService(VoucherModel, 'voucher');

const voucherController = {
  // SEARCH PAGINATION VOUCHER
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex, pageSize, name } = req.query;
    try {
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
        name: name?.toString(),
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
      const { message } = await voucherService.update(id, req, '');
      res.status(HttpStatusCode.OK).json(message);
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
