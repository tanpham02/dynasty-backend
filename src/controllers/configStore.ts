import ConfigStoreModel from '@app/models/configStore';
import ConfigStoreService from '@app/services/configStore';
import { Request, Response } from 'express';

const cfStoreService = new ConfigStoreService(ConfigStoreModel, 'config store');

const configStoreController = {
  getAll: async (req: Request, res: Response) => {
    const result = await cfStoreService.findAll();
    res.status(200).json(result);
    try {
    } catch (error) {
      console.log('error', error);
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
