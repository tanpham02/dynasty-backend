import { Model } from 'mongoose';
import CRUDService from './crudService';
import ConfigStore from '@app/models/configStore/@type';
import { Request } from 'express';

class ConfigStoreService extends CRUDService<ConfigStore> {
  constructor(model: Model<ConfigStore>, nameService: string) {
    super(model, nameService);
  }

  async search() {
    try {
      const configStore = this.model.find();
      return configStore;
    } catch (error) {
      throw new Error(`Occur error when fetching ${this.nameService}`);
    }
  }
}

export default ConfigStoreService;
