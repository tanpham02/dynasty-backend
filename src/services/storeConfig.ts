import { Model } from 'mongoose';
import CRUDService from './crudService';
import StoreConfig from '@app/models/storeConfig/@type';

class StoreConfigService extends CRUDService<StoreConfig> {
  constructor(model: Model<StoreConfig>, nameService: string) {
    super(model, nameService);
  }
}

export default StoreConfigService;
