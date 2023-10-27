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
      res.status(200).json(voucher);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // CREATE VOUCHER
  create: async (req: Request, res: Response) => {
    try {
      const voucher = await voucherService.createOverriding(req);
      res.status(200).json(voucher);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // UPDATE VOUCHER
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const voucher = await voucherService.update(id, req);
      res.status(200).json(voucher);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET BY ID
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const voucher = await voucherService
        .getById(id)
        .then((res) => res?.populate('listProductUsedVoucher'));
      res.status(200).json(voucher);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response) => {
    try {
      const { ids } = req.query;
      const { message } = await voucherService.delete(ids);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default voucherController;
