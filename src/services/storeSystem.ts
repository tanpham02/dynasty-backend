import { Model } from 'mongoose';
import CRUDService from './crudService';
import StoreSystem from '@app/models/storeSystem/@type';

class StoreSystemService extends CRUDService<StoreSystem> {
  constructor(model: Model<StoreSystem>, nameService: string) {
    super(model, nameService);
  }
}

export default StoreSystemService;
