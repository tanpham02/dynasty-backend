/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Model } from 'mongoose';

import { ProductAttribute } from '@app/types';
import CRUDService from './CRUD.service';

class ProductAttriButeService extends CRUDService<ProductAttribute> {
  constructor(model: Model<ProductAttribute>, serviceName: string) {
    super(model, serviceName);
  }
}

export default ProductAttriButeService;
