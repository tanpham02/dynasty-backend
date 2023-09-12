import User from '@app/models/user/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import { Request } from 'express';
import { genSalt, hash } from 'bcrypt';
const SALT: number = 10;

class UserService extends CRUDService<User> {
  constructor(model: Model<User>, nameService: string) {
    super(model, nameService);
  }

  // CREATE
  async createOverriding(req: Request) {
    const { password, ...user }: User = req.body;
    try {
      if (password) {
        const salt = await genSalt(SALT);
        const passwordAfterHash = await hash(password, salt);
        const newUser = new this.model({ ...user, password: passwordAfterHash });
        return await newUser.save();
      }
    } catch (error) {
      throw new Error(`Occur when create ${this.nameService}`);
    }
  }

  // UPDATE
  async updateOverriding(id: string, req: Request) {
    const dataUpdate: User = req.body;
    const { password } = dataUpdate;
    try {
      if (password) {
        const salt = await genSalt(SALT);
        const passwordAfterHash = await hash(password, salt);
        dataUpdate.password = passwordAfterHash;
      }
      await this.model.findByIdAndUpdate(id, dataUpdate, { new: true });

      return { message: `Update ${this.nameService} success` };
    } catch (error) {
      throw new Error(`Occur when create ${this.nameService}`);
    }
  }
}

export default UserService;
