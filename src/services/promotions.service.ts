import { Promotion } from '@app/types/promotions.type';
import CRUDService from './CRUD.service';
import { Model } from 'mongoose';

class PromotionService extends CRUDService<Promotion> {
  constructor(model: Model<Promotion>, nameService: string) {
    super(model, nameService);
  }
}

export default PromotionService;
