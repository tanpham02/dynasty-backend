/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { Model } from 'mongoose';

import { FIELDS_NAME } from '@app/constants';
import Exception from '@app/exception';
import { StaffModel } from '@app/models';
import { CRUDService } from '@app/services';
import { HttpStatusCode, Params, Staff } from '@app/types';
import { handleUploadFile, hashPassword, comparingObjectId } from '@app/utils';

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

  // CREATE
  async createStaff(req: Request) {
    const staffRequestBody = req.body?.[FIELDS_NAME.STAFF]
      ? JSON.parse(JSON.parse(JSON.stringify(req.body?.[FIELDS_NAME.STAFF])))
      : {};

    const avatar = handleUploadFile(req);

    const existStaff = await StaffModel.findOne({
      $or: [
        { username: staffRequestBody?.username },
        { phoneNumber: staffRequestBody?.phoneNumber },
        { email: staffRequestBody?.email },
      ],
    });

    if (existStaff) {
      throw new Exception(
        HttpStatusCode.CONFLICT,
        'Username or phoneNumber or email already exist',
      );
    }

    const newStaff = new StaffModel(staffRequestBody);

    if (avatar) {
      newStaff.$set('image', avatar);
    }

    if (!staffRequestBody?.password) {
      const exception = new Exception(HttpStatusCode.BAD_REQUEST, 'password field is requirement');
      throw exception;
    }
    const passwordAfterHash = await hashPassword(staffRequestBody.password);
    if (passwordAfterHash) {
      newStaff.$set('password', passwordAfterHash);
    }

    await newStaff.save();

    const { password: pw, ...remainingStaff } = newStaff.toObject();
    return remainingStaff;
  }

  // UPDATE
  async updateStaff(id: string, req: Request) {
    const dataUpdate: any = req.body?.[FIELDS_NAME.STAFF]
      ? JSON.parse(JSON.parse(JSON.stringify(req.body?.[FIELDS_NAME.STAFF])))
      : {};

    const avatar = handleUploadFile(req);

    const staffAlreadyExist = (await StaffModel.findById(id)) as any;
    const existUser = await StaffModel.findOne({
      $or: [
        { username: dataUpdate?.username },
        { phoneNumber: dataUpdate?.phoneNumber },
        { email: dataUpdate?.email },
      ],
    });

    if (!staffAlreadyExist) {
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Staff not found');
    }

    if (
      existUser &&
      Boolean(existUser?._id) &&
      Boolean(staffAlreadyExist?._id) &&
      !comparingObjectId(existUser._id, staffAlreadyExist._id!)
    ) {
      throw new Exception(
        HttpStatusCode.CONFLICT,
        'Username or phoneNumber or email already exist',
      );
    }

    Object.keys(dataUpdate).forEach((key) => {
      if (dataUpdate[key] !== undefined && staffAlreadyExist[key] !== dataUpdate[key]) {
        staffAlreadyExist[key] = dataUpdate[key];
      }
    });

    if (avatar) {
      staffAlreadyExist.image = avatar;
    }

    if (staffAlreadyExist?.password) {
      staffAlreadyExist.password = await hashPassword(staffAlreadyExist.password);
    }

    return await staffAlreadyExist.updateOne(staffAlreadyExist, { new: true });
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
