import { Schema, model } from 'mongoose';

import { Role, Staff, Status } from '@app/types';

const StaffSchema = new Schema<Staff>(
  {
    username: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
    },
    fullName: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
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
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: Role,
      default: Role.USER,
    },
    status: {
      type: String,
      enum: Status,
      default: Status.ACTIVE,
    },
  },
  { timestamps: true, versionKey: false },
);

const StaffModel = model('Staff', StaffSchema);

export default StaffModel;
