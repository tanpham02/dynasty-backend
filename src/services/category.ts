import CRUDService from '@app/services/crudService';
import { Model } from 'mongoose';
import { Category } from '@app/models/category/@type';

class CategoryService extends CRUDService<Category> {
  constructor(model: Model<Category>, nameService: String) {
    super(model, nameService);
  }
}

export default CategoryService;
