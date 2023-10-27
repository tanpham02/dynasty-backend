import User from '@app/models/user/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import { Request } from 'express';
import { genSalt, hash } from 'bcrypt';
import { SALT } from '@app/constants';
import { Filter, Params } from '@app/types';
import { configApp } from '@app/configs';
const { APP_URL } = configApp();

class UserService extends CRUDService<User> {
  constructor(model: Model<User>, nameService: string) {
    super(model, nameService);
  }

  // SEARCH PAGINATION
  async getPaginationOverriding(params: Params) {
    try {
      const {
        pageIndex,
        pageSize,
        name,
        productId,
        comboPromotionsId,
        categoryId,
        types,
        cityId,
        districtId,
        wardId,
        fullName,
        role,
      } = params;

      const filter: Filter = {};

      if (name) {
        const patternWithName = { $regex: new RegExp(name, 'gi') };
        filter.name = patternWithName;
      }

      if (productId) {
        filter.productIds = productId;
      }

      if (comboPromotionsId) {
        filter.comboPromotionsId = comboPromotionsId;
      }

      if (categoryId) {
        filter.categoryId = categoryId;
      }

      if (types) {
        filter.types = { $all: types?.split(',') };
      }

      if (cityId) {
        filter.cityId = cityId;
      }
      if (districtId) {
        filter.districtId = districtId;
      }
      if (wardId) {
        filter.wardId = wardId;
      }

      if (fullName) {
        const patternWithFullName = { $regex: new RegExp(fullName, 'gi') };
        filter.fullName = patternWithFullName;
      }

      if (role) {
        filter.role = role;
      }

      const data = await this.model
        .find(filter)
        .limit(pageSize)
        .skip(pageSize * pageIndex);

      const totalElement = await this.model.find(filter).count();
      const totalPages = Math.ceil(totalElement / pageSize);
      const isLastPage = pageIndex + 1 >= totalPages;
      const result = {
        data: data.map((item) => {
          const { password, ...remainingUser } = item.toObject();

          return remainingUser;
        }),
        totalElement,
        pageIndex,
        pageSize,
        totalPage: totalPages,
        isLastPage: isLastPage,
      };
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when fetching ${this.nameService} with ${error}`);
    }
  }

  // CREATE
  async createOverriding(req: Request) {
    const { password, ...user }: User = JSON.parse(req.body.userInfo);
    const filename = req.file?.filename;
    const destination = req.file?.destination;

    if (filename && destination) {
      user.image = `${APP_URL}/${destination}/${filename}`;
    }

    try {
      if (password) {
        const salt = await genSalt(SALT);
        const passwordAfterHash = await hash(password, salt);
        const newUser = new this.model({
          ...user,
          password: passwordAfterHash,
        });
        await newUser.save();

        const { password: pw, ...restUser } = newUser.toObject();
        return restUser;
      }
    } catch (error) {
      console.log('error', error);

      throw new Error(`Occur when create ${this.nameService}`);
    }
  }

  // UPDATE
  async updateOverriding(id: string, req: Request) {
    const dataUpdate: User = req.body?.userInfo ? JSON.parse(req.body?.userInfo) : {};
    const filename = req?.file?.filename;
    const destination = req?.file?.destination;

    let newDataUpdate: any = {};

    if (Object.keys(dataUpdate).length) {
      newDataUpdate = {
        ...dataUpdate,
      };
    }
    if (filename && destination) {
      newDataUpdate.image = `${APP_URL}/${destination}/${filename}`;
    }

    try {
      if (newDataUpdate?.password) {
        const salt = await genSalt(SALT);
        const passwordAfterHash = await hash(newDataUpdate?.password, salt);
        newDataUpdate.password = passwordAfterHash;
      }
      await this.model.findByIdAndUpdate(id, newDataUpdate, { new: true });

      return { message: `Update ${this.nameService} success` };
    } catch (error) {
      throw new Error(`Occur when create ${this.nameService}`);
    }
  }

  // GET BY ID
  async getByIdOverriding(id: string) {
    try {
      const user = await this.model.findById(id);
      if (user) {
        const { password, ...remainingUser } = user?.toObject();
        return remainingUser;
      }
    } catch (error) {
      throw new Error(`Occur when create ${this.nameService}`);
    }
  }
}

export default UserService;
