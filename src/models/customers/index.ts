import { Schema, model } from 'mongoose';
import { Customer, CustomerType } from './@type';
import { ProductStatus } from '@app/constants';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schema:
 *     Customers:
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
 *         customerType:
 *          type: string
 *          default: "NEW"
 *          enum:
 *            - NEW
 *            - EXIST
 *            - POTENTIAL
 *            - BUY_THE_MOST_ORDERS
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
    orderIds: {
      type: [String],
    },
    status: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.ACTIVE,
    },
    customerType: {
      type: String,
      enum: CustomerType,
      default: CustomerType.NEW,
    },
  },
  { versionKey: false, timestamps: true },
);

const CustomerModel = model('Customer', CustomerSchema);

export default CustomerModel;
