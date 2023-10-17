import { Model } from 'mongoose';
import CRUDService from '@app/services/crudService';
import { Customer } from '@app/models/customer/@type';
import CustomerAddressModel from '@app/models/customerAddress';
import { Request } from 'express';

class CustomerService extends CRUDService<Customer> {
  constructor(model: Model<Customer>, nameService: string) {
    super(model, nameService);
  }
}

export default CustomerService;
