import { Model } from 'mongoose';
import CRUDService from './crudService';
import ConfigStore from '@app/models/storeConfig/@type';

class ConfigStoreService extends CRUDService<ConfigStore> {
  constructor(model: Model<ConfigStore>, nameService: string) {
    super(model, nameService);
  }
}

export default ConfigStoreService;
