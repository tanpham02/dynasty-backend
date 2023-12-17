/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FIELDS_NAME } from '@app/constants';
import { HttpStatusCode } from '@app/exception/type';
import StoreSystemModel from '@app/models/storeSystem';
import StoreSystemService from '@app/services/storeSystem';
import { Params } from '@app/types';
import { NextFunction, Request, Response } from 'express';

const storeSystemService = new StoreSystemService(StoreSystemModel, 'store system');

const storeSystemController = {
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
      const shopSystem = await storeSystemService.getPagination(params);
      res.status(HttpStatusCode.OK).json(shopSystem);
    } catch (error) {
      next(error);
    }
  },

  //CREATE
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shopSystem = await storeSystemService.create(req, FIELDS_NAME.STORE_SYSTEM);
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
      const { message } = await storeSystemService.update(id, req, FIELDS_NAME.STORE_SYSTEM);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
      next(error);
    }
  },

  //GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const shopSystem = await storeSystemService.getById(id);
      res.status(HttpStatusCode.OK).json(shopSystem);
    } catch (error) {
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      const { message } = await storeSystemService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default storeSystemController;
