import { Schema, model } from 'mongoose';

import { Role, Staff, Status } from '@app/types';

// SCHEMAS RESPONSE

/**
 * @swagger
 * components:
 *   schema:
 *     Users:
 *       type: object
 *       required:
 *         - username
 *         - phoneNumber
 *         - password
 *         - email
 *       properties:
 *         birthday:
 *           type: string
 *           description: VD 2023-09-09
 *         username:
 *             type: string
 *         fullName:
 *             type: string
 *         image:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         location:
 *           type: string
 *         city:
 *           type: string
 *         cityId:
 *           type: string
 *         district:
 *           type: string
 *         districtId:
 *           type: string
 *         ward:
 *           type: string
 *         wardId:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [ADMIN, USER]
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 */

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
