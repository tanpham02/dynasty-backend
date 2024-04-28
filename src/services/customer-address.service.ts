/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { Model } from 'mongoose';

import Exception from '@app/exception';
import { CustomerAddress, HttpStatusCode } from '@app/types';
import CRUDService from './CRUD.service';
import { CustomerAddressModel } from '@app/models';

class CustomerAddressService extends CRUDService<CustomerAddress> {
  constructor(model: Model<CustomerAddress>, serviceName: string) {
    super(model, serviceName);
  }

  // GET CUSTOMER ADDRESS BY CUSTOMER ID
  async getAddressByCustomerId(customerId: string) {
    const customerAddress = await this.model.findOne({ customerId: customerId });
    if (!customerAddress) {
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Customer address does not exist');
    }
    return customerAddress;
  }

  // GET CUSTOMER ADDRESS ITEM
  async getCustomerAddressItem(addressItemId: string) {
    const customerAddress = await this.model.findOne({ 'addressList._id': addressItemId });
    if (!customerAddress) {
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Customer address does not exist');
    }
    return customerAddress;
  }

  // ADD CUSTOMER ADDRESS ITEM
  async addCustomerAddressItem(req: Request) {
    const customerAddressRequestBody = req.body || {};

    const customerAddress = await this.model.findOne({
      customerId: customerAddressRequestBody?.customerId,
    });

    if (!customerAddress) {
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Customer address does not exist');
    }

    return await customerAddress.updateOne(
      {
        $push: {
          addressList: customerAddressRequestBody?.addressItem,
        },
      },
      {
        new: true,
      },
    );
  }

  // UPDATE CUSTOMER ADDRESS ITEM
  async updateCustomerAddressItem(req: Request, addressItemId: string) {
    const customerAddressRequestBody = req.body || {};

    if (customerAddressRequestBody?.customerId) {
      const customerAddressById = await this.getAddressByCustomerId(
        String(customerAddressRequestBody.customerId),
      );

      if (!customerAddressById) {
        throw new Exception(HttpStatusCode.NOT_FOUND, "Customer address does't exist");
      }

      const addressItem: any = customerAddressById.addressList.find(
        (item) => item._id == addressItemId,
      );

      if (addressItemId && addressItem && customerAddressRequestBody.addressItem) {
        Object.keys(customerAddressRequestBody.addressItem).forEach((key) => {
          if (
            customerAddressRequestBody.addressItem[key] !== undefined &&
            addressItem[key] !== customerAddressRequestBody.addressItem[key]
          ) {
            addressItem[key] = customerAddressRequestBody.addressItem[key];
          }
        });
        return await customerAddressById.updateOne(
          {
            $set: {
              'addressList.$[item]': addressItem,
            },
          },
          {
            arrayFilters: [{ 'item._id': addressItemId }],
            new: true,
          },
        );
      } else {
        throw new Exception(HttpStatusCode.NOT_FOUND, "Customer address item does't exist");
      }
    }
  }

  // DELETE CUSTOMER ADDRESS ITEM
  async deleteCustomerAddressItem(customerId: string, addressItemIds: string[] | any) {
    await CustomerAddressModel.updateMany(
      { customerId: customerId },
      {
        $pull: {
          addressList: {
            _id: {
              $in: addressItemIds,
            },
          },
        },
      },
      {
        new: true,
      },
    );
    return { message: `Delete ${this.serviceName} success` };
  }
}

export default CustomerAddressService;
