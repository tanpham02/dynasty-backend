import { Exception } from '@app/exception';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import ConfigStoreModel from '@app/models/storeConfig';
import ConfigStoreService from '@app/services/configStore';
import { Request, Response } from 'express';

const cfStoreService = new ConfigStoreService(ConfigStoreModel, 'config store');

const configStoreController = {
  getAll: async (res: Response) => {
    const result = await cfStoreService.findAll();
    res.status(HttpStatusCode.OK).json(result);
    try {
    } catch (error: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error.message);
    }
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const { message } = await cfStoreService.update(id, req, '');
      res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error?.message || INTERNAL_SERVER_ERROR_MSG);
    }
  },
};

export default configStoreController;
