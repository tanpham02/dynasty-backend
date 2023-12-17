/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FIELDS_NAME } from '@app/constants';
import { Exception } from '@app/exception';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import BannerModel from '@app/models/banner';
import VoucherModel from '@app/models/vouchers';
import BannerService from '@app/services/banner';
import VoucherService from '@app/services/vouchers';
import { Params } from '@app/types';
import { NextFunction, Request, Response } from 'express';

const bannerService = new BannerService(BannerModel, 'banner');

const bannerController = {
  // SEARCH PAGINATION
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex, pageSize, name, sort } = req.query;
    try {
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
        name: name?.toString(),
        sort: sort?.toString(),
      };
      const banner = await bannerService.getPagination(params);
      res.status(HttpStatusCode.OK).json(banner);
    } catch (error: any) {
      next(error);
    }
  },

  // CREATE
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { message } = await bannerService.createOverriding(req, FIELDS_NAME.BANNER);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      console.log('🚀 ~ file: banners.ts:37 ~ create: ~ error:', error);
      next(error);
    }
  },

  // UPDATE
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { message } = await bannerService.updateOverriding(id, req, FIELDS_NAME.BANNER);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      next(error);
    }
  },

  // GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const banner = await bannerService.getById(id);
      res.status(HttpStatusCode.OK).json(banner);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ids } = req.query;
      const { message } = await bannerService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      next(error);
    }
  },
};

export default bannerController;
