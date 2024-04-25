import { Schema, model } from 'mongoose';

import { Role, Staff, Status } from '@app/types';

const StaffSchema = new Schema<Staff>(
  {
    username: {
      type: String,
      unique: true,
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
      unique: true,
      required: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    location: {
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
