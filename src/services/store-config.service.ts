import { Request } from 'express';
import { Model } from 'mongoose';

import Exception from '@app/exception';
import { HttpStatusCode, StoreConfig } from '@app/types';
import CRUDService from './CRUD.service';

class StoreConfigService extends CRUDService<StoreConfig> {
  constructor(model: Model<StoreConfig>, serviceName: string) {
    super(model, serviceName);
  }

  async updateConfig(req: Request, id: string) {
    const dataUpdate = req.body;
    const stores = (await this.getById(id)) ?? {};

    if (Object.keys(stores).length < 0) {
      throw new Exception(HttpStatusCode.NOT_FOUND, `${this.serviceName} not found!`);
    }

    return await stores.updateOne(dataUpdate, { new: true });
  }
}

export default StoreConfigService;
