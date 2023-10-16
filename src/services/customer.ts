import { Model } from 'mongoose';
import CRUDService from '@app/services/crudService';
import { Customer } from '@app/models/customer/@type';
import CustomerAddressModel from '@app/models/customerAddress';
import { Request } from 'express';

class CustomerService extends CRUDService<Customer> {
  constructor(model: Model<Customer>, nameService: string) {
    super(model, nameService);
  }

  // CREATE
  async createOverriding(req: Request) {
    try {
      const customer = new this.model(req.body);
      const customerAddress = new CustomerAddressModel({
        customerId: customer._id,
        addressList: [],
      });
      await customerAddress.save();
      customer.$set('customerAddressId', customerAddress._id);
      await customer.save();
      return { message: 'Đăng ký thành công' };
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when create ${this.nameService} with ${error}`);
    }
  }
}

export default CustomerService;
