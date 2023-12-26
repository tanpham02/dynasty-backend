/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ProductAttribute } from '@app/models/productAttributes/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import { Request } from 'express';

class ProductAttriButeService extends CRUDService<ProductAttribute> {
  constructor(model: Model<ProductAttribute>, nameService: string) {
    super(model, nameService);
  }
}

export default ProductAttriButeService;
