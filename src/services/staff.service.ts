import { Request } from 'express';
import { Model } from 'mongoose';

import { FIELDS_NAME } from '@app/constants';
import Exception from '@app/exception';
import { StaffModel } from '@app/models';
import { CRUDService } from '@app/services';
import { HttpStatusCode, Params, Staff } from '@app/types';
import { comparingObjectId, handleUploadFile, hashPassword } from '@app/utils';

class StaffService extends CRUDService<Staff> {
  constructor(model: Model<Staff>, serviceName: string) {
    super(model, serviceName);
  }

  // GET PAGINATION EXCLUDE PASSWORD
  async getPaginationExcludePassword(params: Params) {
    const getDataPagination = await this.getPagination(params);
    const result = {
      ...getDataPagination,
      data:
        getDataPagination.data.length > 0
          ? getDataPagination.data.map((item: Staff) => {
              const { password, ...remainingUser } = item.toObject();
              return remainingUser;
            })
          : [],
    };
    return result;
  }

  // BUG
  // CREATE
  async createStaff(req: Request) {
    // const { password, ...user }: Staff = req?.body?.[FIELDS_NAME.USER]
    //   ? JSON.parse(req?.body?.[FIELDS_NAME.USER])
    //   : {};
    const avatars = handleUploadFile(req);

    const existUser = await StaffModel.findOne({
      //   $or: [
      //     { username: user?.username },
      //     { phoneNumber: user?.phoneNumber },
      //     { email: user?.email },
      //   ],
    });

    if (existUser) {
      const exception = new Exception(
        HttpStatusCode.CONFLICT,
        'Username or phoneNumber or email already exist',
      );
      throw exception;
    }

    // if (avatars[0]) {
    //   user.image = avatars[0];
    // }

    // if (!password) {
    //   const exception = new Exception(HttpStatusCode.BAD_REQUEST, 'password field is requirement');
    //   throw exception;
    // }
    // const passwordAfterHash = await hashPassword(password);
    // const newUser = new this.model({
    //   ...user,
    //   password: passwordAfterHash,
    // });
    // await newUser.save();

    // const { password: pw, ...remainingUser } = newUser.toObject();
    // return remainingUser;
  }

  // BUG
  // UPDATE
  async updateStaff(id: string, req: Request) {
    const dataUpdate: Staff = JSON.parse(req?.body?.[FIELDS_NAME.USER]) as Staff;

    const avatar = handleUploadFile(req);

    const isUserAlreadyExist = await StaffModel.findById(id);
    const existUser = await StaffModel.findOne({
      $or: [
        { username: dataUpdate?.username },
        { phoneNumber: dataUpdate?.phoneNumber },
        { email: dataUpdate?.email },
      ],
    });
    let newDataUpdate: any = {};

    if (!isUserAlreadyExist) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Staff not found');
      throw exception;
    }

    // if (
    //   existUser &&
    //   Boolean(isUserAlreadyExist) &&
    //   Boolean(existUser?._id) &&
    //   Boolean(isUserAlreadyExist?._id) &&
    //   comparingObjectId(existUser._id, isUserAlreadyExist._id)
    // ) {
    //   const exception = new Exception(HttpStatusCode.CONFLICT, 'Staff information already exist');
    //   throw exception;
    // }

    if (Object.keys(dataUpdate).length > 0) {
      newDataUpdate = {
        ...dataUpdate,
      };
    }

    if (Boolean(avatar) && Boolean(avatar?.[0])) {
      newDataUpdate.image = avatar[0];
    }

    // if (Boolean(newDataUpdate?.password)) {
    //   const passwordAfterHash = await hashPassword(newDataUpdate?.password);
    //   newDataUpdate.password = passwordAfterHash;
    // }

    await this.model.findByIdAndUpdate(id, newDataUpdate, { new: true });
    return { message: `Update ${this.serviceName} success` };
  }

  // GET BY ID
  async getByIdOverriding(id: string) {
    const staff = await this.model.findById(id);
    if (!staff) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Staff not found!');
      throw exception;
    }
    const { password, ...remainingStaff } = JSON.parse(JSON.stringify(staff));
    return remainingStaff;
  }

  // GET BY EMAIL
  async getByEmail(email: string) {
    const staff = await this.model.find({ email });
    // if (!staff) {
    //   const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Staff not found!');
    //   throw exception;
    // }
    const { password, ...remainingStaff } = JSON.parse(JSON.stringify(staff));
    return remainingStaff;
  }
}

export default StaffService;
