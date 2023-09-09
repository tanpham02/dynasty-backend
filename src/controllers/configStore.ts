import ConfigStoreModel from '@app/models/configStore';
import ConfigStoreService from '@app/services/configStore';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const cfStoreService = new ConfigStoreService(ConfigStoreModel, 'config store');

const configStoreController = {
  search: async (res: Response) => {
    try {
      const result = await ConfigStoreModel.find();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateOverriding: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const configStore = await cfStoreService.update(id, req);
      res.status(200).json(configStore);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default configStoreController;
