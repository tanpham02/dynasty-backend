import { Exception } from '@app/exception';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import VoucherModel from '@app/models/voucher';
import VoucherService from '@app/services/voucher';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const voucherService = new VoucherService(VoucherModel, 'voucher');

const voucherController = {
  // SEARCH PAGINATION VOUCHER
  search: async (req: Request, res: Response) => {
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
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error.message);
    }
  },

  // CREATE VOUCHER
  create: async (req: Request, res: Response) => {
    try {
      const result = await voucherService.createOverriding(req);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      console.log('🚀 ~ file: voucher.ts:33 ~ create: ~ error:', error);
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // UPDATE VOUCHER
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { message } = await voucherService.update(id, req);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error?.message || INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // GET BY ID
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const voucher = await voucherService
        .getById(id)
        .then((res) => res?.populate('listProductUsedVoucher'));
      res.status(HttpStatusCode.OK).json(voucher);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response) => {
    try {
      const { ids } = req.query;
      const { message } = await voucherService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },
};

export default voucherController;
