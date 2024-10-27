/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { BannerModel } from '@app/models';
import { BannerService } from '@app/services';
import { HttpStatusCode, Params } from '@app/types';

const bannerService = new BannerService(BannerModel, 'banner');

const bannerController = {
  // SEARCH PAGINATION
  searchAll: async (__req: Request, res: Response, next: NextFunction) => {
    try {
      const banner = await bannerService.findAll();
      res.status(HttpStatusCode.OK).json(banner);
    } catch (error: any) {
      next(error);
    }
  },

  // SEARCH PAGINATION
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex = 0, pageSize = 10, name, sortBy } = req.query;
    try {
      const params: Params = {
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize),
        name: String(name),
        sortBy: String(sortBy),
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
      const response = await bannerService.createBanner(req);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log('🚀 ~ file: banners.ts:37 ~ create: ~ error:', error);
      next(error);
    }
  },

  // UPDATE
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { message } = await bannerService.updateBanner(id, req);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
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
      next(error);
    }
  },
};

export default bannerController;
