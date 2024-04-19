/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ProductAttribute } from '@app/types/product-attributes.type';
import CRUDService from './CRUD.service';
import { Model } from 'mongoose';
import { Request } from 'express';

class ProductAttriButeService extends CRUDService<ProductAttribute> {
  constructor(model: Model<ProductAttribute>, nameService: string) {
    super(model, nameService);
  }
}

export default ProductAttriButeService;
