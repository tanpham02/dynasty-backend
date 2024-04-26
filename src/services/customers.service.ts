/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { jwtDecode } from 'jwt-decode';
import { Model } from 'mongoose';

import { FIELDS_NAME } from '@app/constants';
import Exception from '@app/exception';
import { CustomerModel } from '@app/models';
import { CRUDService } from '@app/services';
import { Customers, HttpStatusCode } from '@app/types';
import { comparingObjectId, handleUploadFile, hashPassword } from '@app/utils';

class CustomerService extends CRUDService<Customers> {
  constructor(model: Model<Customers>, serviceName: string) {
    super(model, serviceName);
  }

  // UPDATE
  async updateOverriding(id: string, req: Request) {
    const dataUpdate: Customers = req.body?.[FIELDS_NAME.CUSTOMER]
      ? JSON.parse(req.body?.[FIELDS_NAME.CUSTOMER])
      : {};
    const fileUpload = handleUploadFile(req);

    const isCustomerAlreadyExist = await this.getById(id);

    const existCustomer = await CustomerModel.findOne({
      $or: [{ phoneNumber: dataUpdate?.phoneNumber }, { email: dataUpdate?.email }],
    });

    if (!isCustomerAlreadyExist) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, `${this.serviceName} not found`);
      throw exception;
    }

    if (existCustomer && !comparingObjectId(existCustomer._id, id)) {
      const exception = new Exception(HttpStatusCode.CONFLICT, `${this.serviceName} already exist`);
      throw exception;
    }

    if (dataUpdate?.password) {
      const passwordAfterHash = await hashPassword(dataUpdate.password);
      dataUpdate.password = passwordAfterHash;
    }

    if (fileUpload && fileUpload[0].length) {
      dataUpdate.avatar = fileUpload[0];
    }

    await this.model.findByIdAndUpdate(id, dataUpdate, { new: true });
    return { message: `Update ${this.serviceName} success` };
  }

  // GET BY ID
  async getByIdOverriding(id: string) {
    const customer = (await this.getById(id)).populate({
      path: 'customerAddressId',
      model: 'CustomerAddress',
    });

    const { password, ...remaining } = (await customer).toObject();

    return remaining;
  }

  // GET BY Email
  async getByEmail(email: string) {
    const customer = await this.model.findOne({ email });
    if (customer) {
      const { password, ...customerRemaining } = customer.toObject();

      return customerRemaining;
    }
    return undefined;
  }

  // GET CUSTOMER INFO BY ACCESS TOKEN
  async getCustomerInfoByAccessToken(token: string) {
    if (token) {
      const decoded: any = jwtDecode(token);

      if (decoded && decoded.id) {
        const response = await this.getById(decoded.id);

        const { password, _id, ...customerRemaining } = response.toObject();

        return customerRemaining;
      }
    } else {
      const exception = new Exception(HttpStatusCode.UN_AUTHORIZED, "You're not authenticated");
      throw exception;
    }
  }
}

export default CustomerService;
