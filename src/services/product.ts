import { Product } from '@app/models/product/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';

class ProductService extends CRUDService<Product> {
  constructor(model: Model<Product>, nameService: string) {
    super(model, nameService);
  }
}
export default ProductService;
