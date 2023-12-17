import { Model } from 'mongoose';
import CRUDService from './crudService';
import ShopSystem from '@app/models/storeSystem/@type';
import { Filter, Params } from '@app/types';

class ShopSystemClass extends CRUDService<ShopSystem> {
  constructor(model: Model<ShopSystem>, nameService: string) {
    super(model, nameService);
  }
}

export default ShopSystemClass;
