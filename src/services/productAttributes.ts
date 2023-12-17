import { ProductAttribute } from '@app/models/productAttributes/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';

class ProductAttriButeService extends CRUDService<ProductAttribute> {
  constructor(model: Model<ProductAttribute>, nameService: string) {
    super(model, nameService);
  }
}

export default ProductAttriButeService;
