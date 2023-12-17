import { Exception } from '@app/exception';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import ConfigStoreModel from '@app/models/storeConfig';
import ConfigStoreService from '@app/services/configStore';
import { NextFunction, Request, Response } from 'express';

const cfStoreService = new ConfigStoreService(ConfigStoreModel, 'config store');

const configStoreController = {
  getAll: async (res: Response, next: NextFunction) => {
    try {
      const result = await cfStoreService.findAll();
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { message } = await cfStoreService.update(id, req, '');
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default configStoreController;
