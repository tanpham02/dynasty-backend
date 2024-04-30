/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { StoreConfigModel } from '@app/models';
import { StoreConfigService } from '@app/services';
import { HttpStatusCode } from '@app/types';

const storeConfigService = new StoreConfigService(StoreConfigModel, 'store config');

const storeConfigController = {
  // GET STORE CONFIG
  getStoreConfig: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const shopConfig = await storeConfigService.findAll();
      res.status(HttpStatusCode.OK).json(shopConfig.length > 0 ? shopConfig[0] : 0);
    } catch (error) {
      next(error);
    }
  },

  //UPDATE
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const stores = await storeConfigService.updateConfig(req, id);
      res.status(HttpStatusCode.OK).json(stores);
    } catch (error: any) {
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      const { message } = await storeConfigService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default storeConfigController;
