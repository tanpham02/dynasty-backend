import { Promotion } from '@app/types/promotions.type';
import CRUDService from './CRUD.service';
import { Model } from 'mongoose';

class PromotionService extends CRUDService<Promotion> {
  constructor(model: Model<Promotion>, serviceName: string) {
    super(model, serviceName);
  }
}

export default PromotionService;
