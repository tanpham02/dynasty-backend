import { Model } from 'mongoose';

import { StoreSystem } from '@app/types';
import CRUDService from './CRUD.service';

class StoreSystemService extends CRUDService<StoreSystem> {
  constructor(model: Model<StoreSystem>, serviceName: string) {
    super(model, serviceName);
  }
}

export default StoreSystemService;
