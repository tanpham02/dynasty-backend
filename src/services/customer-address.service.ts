/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { Model } from 'mongoose';

import { FIELDS_NAME } from '@app/constants/app';
import Exception from '@app/exception';
import { CustomerAddressModel } from '@app/models';
import { CustomerAddress, HttpStatusCode } from '@app/types';
import CRUDService from './CRUD.service';

class CustomerAddressService extends CRUDService<CustomerAddress> {
  constructor(model: Model<CustomerAddress>, serviceName: string) {
    super(model, serviceName);
  }

  // GET CUSTOMER ADDRESS BY CUSTOMER ID
  async getAddressByCustomerId(customerId: string) {
    const customerAddress = await this.model.findOne({ customerId: customerId });
    if (!customerAddress) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Customer address does not exist');
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

    if (customerAddressDTO?.addressItem?.isDefault) {
      customerAddress.addressList.forEach((item) => {
        (async () => {
          await CustomerAddressModel.updateOne(
            { 'addressList._id': item._id },
            {
              $set: {
                'addressList.$.isDefault': false,
              },
            },
            {
              new: true,
            },
          );
        })();
      });
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

      //   if (customerAddressDTO?.addressItem?.isDefault) {
      //     customerAddressById.addressList.forEach((item) => {
      //       (async () => {
      //         await CustomerAddressModel.updateOne(
      //           { 'addressList._id': item._id },
      //           {
      //             $set: {
      //               'addressList.$.isDefault': false,
      //             },
      //           },
      //           {
      //             new: true,
      //           },
      //         );
      //       })();
      //     });
      //     await customerAddressById.updateOne(
      //       {
      //         $set: {
      //           'addressList.$[inner]': customerAddressDTO?.addressItem,
      //         },
      //       },
      //       {
      //         arrayFilters: [{ 'inner._id': customerAddressItemId }],
      //         new: true,
      //       },
      //     );
      //   }

      await customerAddressById.updateOne(
        {
          $set: {
            'addressList.$[inner]': customerAddressDTO?.addressItem,
          },
        },
        {
          arrayFilters: [{ 'inner._id': customerAddressItemId }],
          new: true,
        },
      );

      console.log('customerAddressDTO?.addressItem', customerAddressDTO?.addressItem);

      return { message: `Update ${this.serviceName} success` };
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
    return { message: `Delete ${this.serviceName} success` };
  }
}

export default CustomerAddressService;
