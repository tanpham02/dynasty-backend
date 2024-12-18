/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { jwtDecode } from 'jwt-decode';
import { Model } from 'mongoose';

import { FIELDS_NAME } from '@app/constants';
import Exception from '@app/exception';
import { CustomerModel } from '@app/models';
import { CRUDService } from '@app/services';
import { Customers, HttpStatusCode, Params } from '@app/types';
import { comparingObjectId, handleUploadFile, hashPassword } from '@app/utils';

class CustomerService extends CRUDService<Customers> {
  constructor(model: Model<Customers>, serviceName: string) {
    super(model, serviceName);
  }

  // GET PAGINATION EXCLUDE PASSWORD
  async getPaginationExcludePassword(params: Params) {
    const getDataPagination = await this.getPagination(params);
    const result = {
      ...getDataPagination,
      data:
        getDataPagination.data.length > 0
          ? getDataPagination.data.map((item: Customers) => {
              const { password, ...remainingUser } = item.toObject();
              return remainingUser;
            })
          : [],
    };
    return result;
  }

  // UPDATE
  async updateCustomer(id: string, req: Request) {
    const dataUpdate: Customers = req.body?.[FIELDS_NAME.CUSTOMER]
      ? JSON.parse(JSON.parse(JSON.stringify(req.body?.[FIELDS_NAME.CUSTOMER])))
      : {};
    const fileUpload = handleUploadFile(req);

    const isCustomerAlreadyExist = await this.getById(id);

    if (!isCustomerAlreadyExist)
      throw new Exception(HttpStatusCode.NOT_FOUND, `${this.serviceName} not found`);

    const existCustomer = await CustomerModel.findOne({
      $and: [
        {
          $or: [{ phoneNumber: dataUpdate?.phoneNumber }, { email: dataUpdate?.email }],
        },
        {
          _id: {
            $ne: id,
          },
        },
      ],
    }).lean();

    if (existCustomer)
      throw new Exception(HttpStatusCode.CONFLICT, `The ${this.serviceName} already exist`);

    if (dataUpdate?.password) {
      const passwordAfterHash = await hashPassword(dataUpdate.password);
      dataUpdate.password = passwordAfterHash;
    }

    if (fileUpload) {
      dataUpdate.avatar = fileUpload;
    }

    return await this.model.findByIdAndUpdate(id, dataUpdate, { new: true });
  }

  // GET BY ID
  async getByIdCustomer(id: string) {
    const customer = await this.getById(id, ['customerAddressId']);

    const { password, ...remaining } = customer;

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
