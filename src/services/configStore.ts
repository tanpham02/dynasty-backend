import { Model } from 'mongoose';
import CRUDService from './crudService';
import ConfigStore from '@app/models/configStore/@type';

class ConfigStoreService extends CRUDService<ConfigStore> {
  constructor(model: Model<ConfigStore>, nameService: string) {
    super(model, nameService);
  }
}

export default ConfigStoreService;
