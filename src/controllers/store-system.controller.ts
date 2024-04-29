/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { StoreSystemModel } from '@app/models';
import { StoreSystemService } from '@app/services';
import { HttpStatusCode, Params } from '@app/types';

const storeSystemService = new StoreSystemService(StoreSystemModel, 'store system');

const storeSystemController = {
  //SEARCH PAGINATION
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex = 0, pageSize = 10, name, cityId, districtId, wardId, sortBy } = req.query;
    try {
      const params: Params = {
        name: name?.toString(),
        cityId: Number(cityId),
        districtId: Number(districtId),
        wardId: Number(wardId),
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize),
        sortBy: sortBy?.toString(),
      };
      const storeSystem = await storeSystemService.getPagination(params);
      res.status(HttpStatusCode.OK).json(storeSystem);
    } catch (error) {
      next(error);
    }
  },

  //CREATE
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const storeSystem = await storeSystemService.create(req);
      res.status(HttpStatusCode.OK).json(storeSystem);
    } catch (error) {
      console.log('🚀 ~ file: storeSystem.ts:36 ~ create: ~ error:', error);
      next(error);
    }
  },

  //UPDATE
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await storeSystemService.update(id, req);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error: any) {
      next(error);
    }
  },

  //GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const storeSystem = await storeSystemService.getById(id);
      res.status(HttpStatusCode.OK).json(storeSystem);
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
