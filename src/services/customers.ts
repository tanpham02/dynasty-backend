/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Model } from 'mongoose';
import CRUDService from '@app/services/crudService';
import { Customer } from '@app/models/customers/@type';
import { Request } from 'express';
import CustomerModel from '@app/models/customers';
import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';
import { genSalt, hash } from 'bcrypt';
import { SALT } from '@app/constants';

class CustomerService extends CRUDService<Customer> {
  constructor(model: Model<Customer>, nameService: string) {
    super(model, nameService);
  }

  // UPDATE
  async updateOverriding(id: string, req: Request) {
    const dataUpdate: Customer = req.body?.customerInfo ? JSON.parse(req?.body?.customerInfo) : {};

    const isCustomerAlreadyExist = await this.getById(id);

    const existCustomer = await CustomerModel.findOne({
      $or: [{ phoneNumber: dataUpdate?.phoneNumber }, { email: dataUpdate?.email }],
    });
    let newDataUpdate: any = {};

    if (!isCustomerAlreadyExist) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, `${this.nameService} not found`);
      throw exception;
    }

    if (existCustomer) {
      const exception = new Exception(HttpStatusCode.CONFLICT, `${this.nameService} already exist`);
      throw exception;
    }

    if (Object.keys(dataUpdate).length) {
      newDataUpdate = {
        ...dataUpdate,
      };
    }

    if (newDataUpdate?.password) {
      const salt = await genSalt(SALT);
      const passwordAfterHash = await hash(newDataUpdate.password, salt);
      newDataUpdate.password = passwordAfterHash;
    }
    await this.model.findByIdAndUpdate(id, newDataUpdate, { new: true });
    return { message: `Update ${this.nameService} success` };
  }
}

export default CustomerService;
