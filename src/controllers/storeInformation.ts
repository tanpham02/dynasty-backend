/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FIELDS_NAME } from '@app/constants';
import { HttpStatusCode } from '@app/exception/type';
import { Models } from '@app/models';
import StoreInformationService from '@app/services/storeInformation';
import { NextFunction, Request, Response } from 'express';

const storeInformationService = new StoreInformationService(
  Models.StoreInformationModel,
  'store information',
);

const storeInformationController = {
  //SEARCH ALL
  searchAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shopInformation = await storeInformationService.findAll();
      res.status(HttpStatusCode.OK).json(shopInformation);
    } catch (error) {
      next(error);
    }
  },

  //CREATE
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shopInformation = await storeInformationService.create(
        req,
        FIELDS_NAME.STORE_INFORMATION,
      );
      res.status(HttpStatusCode.OK).json(shopInformation);
    } catch (error) {
      next(error);
    }
  },

  //UPDATE
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { message } = await storeInformationService.update(
        id,
        req,
        FIELDS_NAME.STORE_INFORMATION,
      );
      res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
      next(error);
    }
  },

  //GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const shopInformation = await storeInformationService.getById(id);
      res.status(HttpStatusCode.OK).json(shopInformation);
    } catch (error) {
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      const { message } = await storeInformationService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default storeInformationController;
