import { BaseModel } from '@app/types/common.types';
import { Schema } from 'mongoose';

enum CustomerType {
  NEW = 'NEW',
  EXIST = 'EXIST',
  POTENTIAL = 'POTENTIAL',
  BUY_THE_MOST_ORDERS = 'BUY_THE_MOST_ORDERS',
}
interface Customers extends BaseModel {
  phoneNumber?: string;
  fullName?: string;
  email?: string;
  password?: string;
  birthday?: string | Date;
  customerAddressId: Schema.Types.ObjectId;
  orderIds: string[];
  customerType: CustomerType;
  otp?: string;
  avatar?: string;
}

export { Customers, CustomerType };
