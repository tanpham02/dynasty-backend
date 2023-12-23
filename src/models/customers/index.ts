import { Schema, model } from 'mongoose';
import { Customer, CustomerType } from './@type';
import { ProductStatus } from '@app/constants';
import moment from 'moment';
import 'moment-timezone';
import { TIME_ZONE_VIET_NAME, YYYY_MM_DDTHH_MM_SS, YYYY_MM_DD_HH_MM_SS } from '@app/utils/date';

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
  {
    versionKey: false,
    timestamps: {
      currentTime() {
        const now = new Date();
        const strictUTC = moment(now).utc(true);
        const dayAdjustment = strictUTC.clone().tz(TIME_ZONE_VIET_NAME);
        return Number(dayAdjustment);
      },
    },
  },
);

const CustomerModel = model('Customer', CustomerSchema);

export default CustomerModel;
