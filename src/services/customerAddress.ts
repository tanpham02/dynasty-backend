/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Model } from 'mongoose';
import CRUDService from './crudService';
import { Request } from 'express';
import { CustomerAddress } from '@app/models/customerAddress/@type';
import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';
import { FIELDS_NAME } from '@app/constants';

class CustomerAddressService extends CRUDService<CustomerAddress> {
  constructor(model: Model<CustomerAddress>, nameService: string) {
    super(model, nameService);
  }

  // GET CUSTOMER ADDRESS BY CUSTOMER ID
  async getAddressByCustomerId(customerId: string) {
    const customerAddress = await this.model.findOne({ customerId: customerId });
    if (!customerAddress) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Customer addres does not exist');
      throw exception;
    }
    return customerAddress;
  }

  // ADD CUSTOMER ADDRESS ITEM
  async addCustomerAddressItem(req: Request) {
    const customerAddressDTO = JSON.parse(req.body?.[FIELDS_NAME.CUSTOMER_ADDRESS]);
    const customerAddress = await this.model.findOne({
      customerId: customerAddressDTO?.customerId,
    });

    if (!customerAddress) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Customer address does not exist');
      throw exception;
    }
    await customerAddress.updateOne(
      { $push: { addressList: customerAddressDTO?.addressItem } },
      { new: true },
    );

    return { message: 'Add address item success' };
  }

  // UPDATE CUSTOMER ADDRESS ITEM
  async updateCustomerAddressItem(customerAddressItemId: string, req: Request) {
    const customerAddressDTO = JSON.parse(req.body?.[FIELDS_NAME.CUSTOMER_ADDRESS]);
    console.log(
      '🚀 ~ file: customerAddress.ts:47 ~ CustomerAddressService ~ updateCustomerAddressItem ~ customerAddressDTO:',
      customerAddressDTO,
    );

    if (customerAddressDTO.customerId) {
      const customerAddressById = await this.getAddressByCustomerId(
        String(customerAddressDTO.customerId),
      );

      if (!customerAddressById) {
        const exception = new Exception(
          HttpStatusCode.NOT_FOUND,
          'Customer address does not exist',
        );
        throw exception;
      }
      await customerAddressById.updateOne(
        {
          $set: {
            'addressList.$[outer]': {
              ...customerAddressDTO?.addressItem,
              _id: customerAddressItemId,
            },
          },
        },
        {
          arrayFilters: [{ 'outer._id': customerAddressItemId }],
          new: true,
        },
      );

      return { message: `Update ${this.nameService} success` };
    }
  }

  // DELETE CUSTOMER ADDRESS ITEM
  async deleteCustomerAddressItem(customerAddressItemId: string) {
    const customerAddressItem = await this.model.findOne({
      'addressList._id': customerAddressItemId,
    });
    if (!customerAddressItem) {
      const exception = new Exception(
        HttpStatusCode.NOT_FOUND,
        'Customer address item does not exist',
      );
      throw exception;
    }
    await customerAddressItem.updateOne(
      {
        $pull: { addressList: { _id: customerAddressItemId } },
      },
      {
        new: true,
      },
    );
    return { message: `Delete ${this.nameService} success` };
  }
}

export default CustomerAddressService;
