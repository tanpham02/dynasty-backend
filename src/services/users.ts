import User from '@app/models/users/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import { genSalt, hash } from 'bcrypt';
import { FIELDS_NAME, SALT } from '@app/constants';
import { Filter, Params } from '@app/types';
import { configApp } from '@app/configs';
import { HttpStatusCode } from '@app/exception/type';
import UserModel from '@app/models/users';
import { Exception } from '@app/exception';

class UserService extends CRUDService<User> {
  constructor(model: Model<User>, nameService: string) {
    super(model, nameService);
  }

  // CREATE
  async createOverriding(req: Request) {
    const { password, ...user }: User = req?.body?.[FIELDS_NAME.USER]
      ? JSON.parse(req?.body?.[FIELDS_NAME.USER])
      : {};
    const existUser = await UserModel.findOne({
      $or: [
        { username: user?.username },
        { phoneNumber: user?.phoneNumber },
        { email: user?.email },
      ],
    });
    const filename = req.file?.filename;
    const destination = req.file?.destination;

    if (existUser) {
      const exception = new Exception(
        HttpStatusCode.CONFLICT,
        'Username or phoneNumber or email already exist',
      );
      throw exception;
    }

    if (filename && destination) {
      user.image = `/${destination}/${filename}`;
    }

    if (password) {
      const salt = await genSalt(SALT);
      const passwordAfterHash = await hash(password, salt);
      const newUser = new this.model({
        ...user,
        password: passwordAfterHash,
      });
      await newUser.save();

      const { password: pw, ...remainingUser } = newUser.toObject();
      return remainingUser;
    }
  }

  // UPDATE
  async updateOverriding(id: string, req: Request) {
    const dataUpdate: User = req.body?.[FIELDS_NAME.USER]
      ? JSON.parse(req?.body?.[FIELDS_NAME.USER])
      : {};
    const filename = req?.file?.filename;
    const destination = req?.file?.destination;

    const isUserAlreadyExist = await this.getById(id);
    const existUser = await UserModel.findOne({
      $or: [
        { username: dataUpdate?.username },
        { phoneNumber: dataUpdate?.phoneNumber },
        { email: dataUpdate?.email },
      ],
    });
    let newDataUpdate: any = {};

    if (!isUserAlreadyExist) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'User not found');
      throw exception;
    }

    if (existUser) {
      const exception = new Exception(HttpStatusCode.CONFLICT, 'User information already exist');
      throw exception;
    }

    if (Object.keys(dataUpdate).length) {
      newDataUpdate = {
        ...dataUpdate,
      };
    }

    if (filename && destination) {
      newDataUpdate.image = `/${destination}/${filename}`;
    }

    if (newDataUpdate?.password) {
      const salt = await genSalt(SALT);
      const passwordAfterHash = await hash(newDataUpdate?.password, salt);
      newDataUpdate.password = passwordAfterHash;
    }
    await this.model.findByIdAndUpdate(id, newDataUpdate, { new: true });
    return { message: `Update ${this.nameService} success` };
  }

  // GET BY ID
  async getByIdOverriding(id: string) {
    const user = await this.model.findById(id);
    if (!user) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'User not found!');
      throw exception;
    }
    const { password, ...remainingUser } = user?.toObject();
    return remainingUser;
  }
}

export default UserService;
