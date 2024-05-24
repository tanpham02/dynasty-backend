import { Schema, model } from 'mongoose';

import { CustomerType, Customers, Status } from '@app/types';

const CustomerSchema = new Schema<Customers>(
  {
    phoneNumber: {
      type: String,
    },
    avatar: {
      type: String,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      minlength: 6,
    },
    birthday: {
      type: Date,
    },
    customerAddressId: {
      type: Schema.Types.ObjectId,
      ref: 'CustomerAddress',
    },
    orderIds: {
      type: [String],
    },
    status: {
      type: String,
      enum: Status,
      default: Status.ACTIVE,
    },
    customerType: {
      type: String,
      enum: CustomerType,
      default: CustomerType.NEW,
    },
    otp: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const CustomerModel = model('Customer', CustomerSchema);

export default CustomerModel;
