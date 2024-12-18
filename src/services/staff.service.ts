/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { compare } from 'bcrypt';
import { Request } from 'express';
import { Model } from 'mongoose';

import { FIELDS_NAME } from '@app/constants';
import Exception from '@app/exception';
import { SalaryModel, StaffModel } from '@app/models';
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

  // CHECK MATCH OLD PASSWORD WHEN CHANGE PASSWORD
  async checkMatchOldPassword(req: Request) {
    const requestBody: Staff = req.body;

    if (requestBody._id) {
      const staff = await this.getById(requestBody._id);

      if (!staff) {
        throw new Exception(HttpStatusCode.NOT_FOUND, 'Not found staff with this id');
      }

      return (
        requestBody.password &&
        staff.password &&
        (await compare(requestBody.password, staff.password))
      );
    }
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

    const newSalary = new SalaryModel({ value: staffRequestBody.salary, staffId: newStaff._id });
    await newStaff.save();
    newStaff.set('salary', newSalary._id);
    await newSalary.save();

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

    const ignoreKey = ['password', 'image'];

    Object.keys(dataUpdate).forEach((key) => {
      if (
        !ignoreKey.includes(key) &&
        dataUpdate[key] !== undefined &&
        staffAlreadyExist[key] !== dataUpdate[key]
      ) {
        staffAlreadyExist[key] = dataUpdate[key];
      }
    });

    if (avatar) {
      staffAlreadyExist.image = avatar;
    }

    if (dataUpdate?.password) {
      staffAlreadyExist.password = await hashPassword(dataUpdate.password);
    }

    if (dataUpdate?.salary) {
      await SalaryModel.updateOne(
        { _id: dataUpdate?.salaryId },
        { $set: { value: dataUpdate?.salary } },
        { new: true },
      );
    }

    return await staffAlreadyExist.updateOne(staffAlreadyExist, { new: true });
  }

  // GET BY ID
  async getByIdOverriding(id: string) {
    const staff = await this.model.findById(id)?.populate(['salary']);
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
