/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Exception } from '@app/exception';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import ShopSystemModel from '@app/models/storeSystem';
import ShopSystemClass from '@app/services/storeSystem';
import { Params } from '@app/types';
const ShopSystemService = new ShopSystemClass(ShopSystemModel, 'shop system');
import { NextFunction, Request, Response } from 'express';

const StoreSystemSystemController = {
  //SEARCH PAGINATION
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex, pageSize, name, cityId, districtId, wardId } = req.query;
    try {
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
        name: name?.toString(),
        cityId: Number(cityId),
        districtId: Number(districtId),
        wardId: Number(wardId),
      };
      const shopSystem = await ShopSystemService.getPagination(params);
      res.status(HttpStatusCode.OK).json(shopSystem);
    } catch (error) {
      next(error);
    }
  },

  //CREATE
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shopSystem = await ShopSystemService.create(req, '');
      res.status(HttpStatusCode.OK).json(shopSystem);
    } catch (error) {
      console.log('🚀 ~ file: storeSystem.ts:36 ~ create: ~ error:', error);
      next(error);
    }
  },

  //UPDATE
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { message } = await ShopSystemService.update(id, req, '');
      res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
      next(error);
    }
  },

  //GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const shopSystem = await ShopSystemService.getById(id);
      res.status(HttpStatusCode.OK).json(shopSystem);
    } catch (error) {
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      const { message } = await ShopSystemService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default StoreSystemSystemController;
