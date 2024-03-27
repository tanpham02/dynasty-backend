import { Models, model } from 'mongoose';
import { Models, Types } from '@app/models';
import CRUDService from './crudService';

const { ProductFavorite } = Types;


class ProductFavoriteService extends CRUDService<ProductFavorite> {
  constructor(model:Models., serviceName: string) {
    super(model, serviceName);
  }
}
