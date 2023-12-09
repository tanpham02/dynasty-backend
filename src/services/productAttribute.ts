import { ProductAttribute } from '@app/models/productAttribute/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';

class ProductAttriButeService extends CRUDService<ProductAttribute> {
  constructor(model: Model<ProductAttribute>, nameService: string) {
    super(model, nameService);
  }
}

export default ProductAttriButeService;
