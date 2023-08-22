import { Schema, model } from 'mongoose';
import { Customer } from './@type';
import { Status } from '@app/constants';

const CustomerSchema = new Schema<Customer>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    birthday: {
      type: String,
    },
    city: {
      type: String,
    },
    cityId: {
      type: Number,
    },
    district: {
      type: String,
    },
    districtId: {
      type: Number,
    },
    ward: {
      type: String,
    },
    wardId: {
      type: Number,
    },
    status: {
      type: String,
      enum: Status,
      default: Status.ACTIVE,
    },
  },
  { versionKey: false, timestamps: true },
);

const CustomerModel = model('Customer', CustomerSchema);

export default CustomerModel;
