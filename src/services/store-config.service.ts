import { Model } from 'mongoose';

import { StoreConfig } from '@app/types';
import CRUDService from './CRUD.service';

class StoreConfigService extends CRUDService<StoreConfig> {
  constructor(model: Model<StoreConfig>, serviceName: string) {
    super(model, serviceName);
  }
}

export default StoreConfigService;
