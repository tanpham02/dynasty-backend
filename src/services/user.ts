import User from '@app/models/user/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';

class UserService extends CRUDService<User> {
  constructor(model: Model<User>, nameService: string) {
    super(model, nameService);
  }
}

export default UserService;
