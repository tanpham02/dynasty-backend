import { ProductVariants } from '@app/models/productVariant/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';

class ProductVariantService extends CRUDService<ProductVariants> {
  constructor(model: Model<ProductVariants>, nameService: string) {
    super(model, nameService);
  }
}

export default ProductVariantService;
