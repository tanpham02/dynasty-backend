import { Schema, model } from 'mongoose';

import { Status, StoreSystem } from '@app/types';

const storeSystemSchema = new Schema<StoreSystem>(
  {
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    location: {
      type: String,
    },
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
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    status: {
      type: String,
      enum: Status,
    },
  },
  { timestamps: true, versionKey: false },
);

const StoreSystemModel = model('StoreSystem', storeSystemSchema);

export default StoreSystemModel;
