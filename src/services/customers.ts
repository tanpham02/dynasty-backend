/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FIELDS_NAME } from '@app/constants';
import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';
import CustomerModel from '@app/models/customers';
import { Customer } from '@app/models/customers/@type';
import CRUDService from '@app/services/crudService';
import { comparingObjectId } from '@app/utils/comparingObjectId';
import hashPassword from '@app/utils/hashPassword';
import { Request } from 'express';
import { Model } from 'mongoose';

class CustomerService extends CRUDService<Customer> {
  constructor(model: Model<Customer>, nameService: string) {
    super(model, nameService);
  }

  // UPDATE
  async updateOverriding(id: string, req: Request) {
    const dataUpdate: Customer = JSON.parse(req.body?.[FIELDS_NAME.CUSTOMER]) || {};

    const isCustomerAlreadyExist = await this.getById(id);

    const existCustomer = await CustomerModel.findOne({
      $or: [{ phoneNumber: dataUpdate?.phoneNumber }, { email: dataUpdate?.email }],
    });

    if (!isCustomerAlreadyExist) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, `${this.nameService} not found`);
      throw exception;
    }

    if (existCustomer && !comparingObjectId(existCustomer._id, id)) {
      const exception = new Exception(HttpStatusCode.CONFLICT, `${this.nameService} already exist`);
      throw exception;
    }

    if (dataUpdate?.password) {
      const passwordAfterHash = await hashPassword(dataUpdate.password);
      dataUpdate.password = passwordAfterHash;
    }

    await this.model.findByIdAndUpdate(id, dataUpdate, { new: true });
    return { message: `Update ${this.nameService} success` };
  }

  // GET BY ID
  async getByIdOverriding(id: string) {
    const customer = (await this.getById(id)).populate({
      path: 'customerAddressId',
      model: 'CustomerAddress',
    });

    return await customer;
  }

  // GET BY ID
  async getByEmail(email: string) {
    const customer = await this.model.findOne({ email });
    if (customer) {
      const { password, ...customerRemaining } = customer.toObject();

      return customerRemaining;
    }
    return undefined;
  }
}

export default CustomerService;
