import { Schema, model } from 'mongoose';

import { CustomerAddress } from '../types/customer-address.type';

const CustomerAddressSchema = new Schema<CustomerAddress>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    addressList: [
      {
        city: {
          type: String,
        },
        cityId: {
          type: String,
        },
        district: {
          type: String,
        },
        districtId: {
          type: String,
        },
        ward: {
          type: String,
        },
        wardId: {
          type: String,
        },
        fullName: {
          type: String,
        },
        location: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true },
);

const CustomerAddressModel = model('CustomerAddress', CustomerAddressSchema);

export default CustomerAddressModel;
