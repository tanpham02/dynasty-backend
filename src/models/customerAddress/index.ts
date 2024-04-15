import { Schema, model } from 'mongoose';
import { CustomerAddress } from './@type';

// SWAGGER RESPONSE

/**
 * @swagger
 * components:
 *   schema:
 *     CustomerAddress:
 *       type: object
 *       properties:
 *         customerId:
 *            type: string
 *         addressList:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              city:
 *                  type: string
 *              cityId:
 *                  type: string
 *              district:
 *                  type: string
 *              districtId:
 *                  type: string
 *              ward:
 *                  type: string
 *              wardId:
 *                  type: string
 *              location:
 *                  type: string
 *              fullName:
 *                  type: string
 *              phoneNumber:
 *                  type: string
 *              isDefault:
 *                  type: boolean
 *                  default: false
 */

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
