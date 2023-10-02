import { Schema, model } from 'mongoose';
import { Customer } from './@type';
import { Status } from '@app/constants';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schema:
 *     Customer:
 *       type: object
 *       properties:
 *         phoneNumber:
 *             type: string
 *         fullName:
 *             type: string
 *         email:
 *             type: string
 *         password:
 *             type: string
 *         birthday:
 *             type: string
 *             description: 2023-05-25
 *         customerAddressId:
 *             type: string
 *         orderIds:
 *             type: array
 *             items:
 *                type: string
 *         status:
 *          type: string
 *          default: "ACTIVE"
 *          enum:
 *             - ACTIVE
 *             - IN_ACTIVE
 */

const CustomerSchema = new Schema<Customer>(
  {
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
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
    birthday: {
      type: Date,
    },
    customerAddressId: {
      type: Schema.Types.ObjectId,
      ref: 'CustomerAddress',
    },
    orderIds: [
      {
        type: [String],
      },
    ],
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
