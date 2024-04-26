/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { StoreModel } from '@app/models';
import { StoreService } from '@app/services';
import { HttpStatusCode } from '@app/types';

const storeService = new StoreService(StoreModel, 'stores');

const storesController = {
  // GET STORE CONFIG
  getStoreConfig: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const shopConfig = await storeService.findAll();
      res.status(HttpStatusCode.OK).json(shopConfig);
    } catch (error) {
      next(error);
    }
  },

  //CREATE
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shopConfig = await storeService.createStores(req);
      res.status(HttpStatusCode.OK).json(shopConfig);
    } catch (error) {
      next(error);
    }
  },

  //UPDATE
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const stores = await storeService.update(id, req);
      res.status(HttpStatusCode.OK).json(stores);
    } catch (error: any) {
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      const { message } = await storeService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default storesController;
