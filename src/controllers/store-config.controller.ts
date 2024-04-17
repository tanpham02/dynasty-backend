/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FIELDS_NAME } from '@app/constants';
import { HttpStatusCode } from '@app/exception/type';
import { Models } from '@app/models';
import StoreConfigService from '@app/services/storeConfig';
import { NextFunction, Request, Response } from 'express';

// const storeConfigService = new StoreConfigService(Models.StoreConfigModel, 'store config');

const storeConfigController = {
  //SEARCH ALL
  searchAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      //   const shopConfig = await storeConfigService.findAll();
      //   res.status(HttpStatusCode.OK).json(shopConfig);
    } catch (error) {
      next(error);
    }
  },

  //CREATE
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      //   const shopConfig = await storeConfigService.create(req, FIELDS_NAME.STORE_CONFIG);
      //   res.status(HttpStatusCode.OK).json(shopConfig);
    } catch (error) {
      next(error);
    }
  },

  //UPDATE
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      //   const { message } = await storeConfigService.update(id, req, FIELDS_NAME.STORE_CONFIG);
      //   res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
      next(error);
    }
  },

  //GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      //   const shopConfig = await storeConfigService.getById(id);
      //   res.status(HttpStatusCode.OK).json(shopConfig);
    } catch (error) {
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      //   const { message } = await storeConfigService.delete(ids);
      //   res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default storeConfigController;
