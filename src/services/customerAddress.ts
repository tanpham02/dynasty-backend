import { Model } from 'mongoose';
import CRUDService from './crudService';
import { CustomerAddressItem, CustomerAddressList } from '@app/models/customerAddress/@type';
import { Request } from 'express';

class CustomerAddressService extends CRUDService<CustomerAddressList> {
  constructor(model: Model<CustomerAddressList>, nameService: string) {
    super(model, nameService);
  }

  async getAll() {
    try {
      const listAddress = await this.model.find();
      return listAddress;
    } catch (error) {
      throw new Error(`Occur error when get ${this.nameService}`);
    }
  }

  async getAddressByCustomerId(customerId: string) {
    try {
      const listAddress = await this.model.find({ customerId: customerId });
      return listAddress?.[0];
    } catch (error) {
      throw new Error(`Occur error when get ${this.nameService}`);
    }
  }

  async addAddress(customerId: string | any, req: Request) {
    console.log('req.body', req.body);
    try {
      return await this.model.findOneAndUpdate(
        { customerId: customerId },
        { $push: { addressList: req.body } },
        { new: true },
      );
    } catch (error) {
      throw new Error(`Occur error when get ${this.nameService}`);
    }
  }

  async updateAddress(itemAddressId: string, req: Request) {
    const { city, district, ward, address, phoneNumber, isDefault }: CustomerAddressItem = req.body;
    const keySet = `addressList.$`;
    const dataSet: any[] = [];

    if (city) {
      dataSet.push({ [`${keySet}.city`]: city });
    }
    if (district) {
      dataSet.push({ [`${keySet}.district`]: district });
    }
    if (ward) {
      dataSet.push({ [`${keySet}.ward`]: ward });
    }
    if (address) {
      dataSet.push({ [`${keySet}.address`]: address });
    }
    if (phoneNumber) {
      dataSet.push({ [`${keySet}.phoneNumber`]: phoneNumber });
    }
    if (isDefault) {
      dataSet.push({ [`${keySet}.isDefault`]: isDefault });
    }

    try {
      for (let i = 0; i < dataSet.length; i++) {
        const element = dataSet[i];
        await this.model.findOneAndUpdate(
          {
            'addressList._id': itemAddressId,
          },
          {
            $set: element,
          },
          {
            new: true,
          },
        );
      }

      return { message: `Update ${this.nameService} success` };
    } catch (error) {
      throw new Error(`Occur error when update item address`);
    }
  }

  async deleteAddress(itemAddressId: string, req: Request) {
    try {
      await this.model.findOneAndUpdate(
        {
          'addressList._id': itemAddressId,
        },
        {
          $pull: { addressList: { _id: itemAddressId } },
        },
        {
          new: true,
        },
      );
      return { message: `Delete ${this.nameService} success` };
    } catch (error) {
      throw new Error(`Occur error when get ${this.nameService}`);
    }
  }
}

export default CustomerAddressService;
