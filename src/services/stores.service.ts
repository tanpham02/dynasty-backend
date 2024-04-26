import { Request } from 'express';
import { Model } from 'mongoose';

import { Stores } from '@app/types';
import CRUDService from './CRUD.service';

class StoreService extends CRUDService<Stores> {
  constructor(model: Model<Stores>, serviceName: string) {
    super(model, serviceName);
  }

  async createStores(req: Request) {
    const existed = await this.findAll();

    if (existed.length > 0) {
      return existed[0];
    }

    return await this.create(req);
  }
}

export default StoreService;
