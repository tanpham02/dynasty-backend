import { Model } from 'mongoose';
import CRUDService from './crudService';
import StoreInformation from '@app/models/storeInformation/@type';

class StoreInformationService extends CRUDService<StoreInformation> {
  constructor(model: Model<StoreInformation>, nameService: string) {
    super(model, nameService);
  }
}

export default StoreInformationService;
