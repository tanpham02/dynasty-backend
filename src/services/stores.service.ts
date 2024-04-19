import { Model } from 'mongoose';
import CRUDService from './CRUD.service';
import { Stores } from '@app/types';

class StoreService extends CRUDService<Stores> {
  constructor(model: Model<Stores>, nameService: string) {
    super(model, nameService);
  }
}

export default StoreService;
