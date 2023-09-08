import { Promotion } from '@app/models/promotions/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';

class PromotionService extends CRUDService<Promotion> {
  constructor(model: Model<Promotion>, nameService: string) {
    super(model, nameService);
  }
}

export default PromotionService;
