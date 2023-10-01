import { Schema, model } from 'mongoose';
import { CustomerAddress } from './@type';

// SCHEMAS RESPONSE

/**
 * @swagger
 * components:
 *   schema:
 *     CustomerAddressList:
 *       type: object
 *       properties:
 *         city:
 *             type: string
 *         district:
 *             type: string
 *         ward:
 *             type: string
 *         address:
 *             type: string
 *         phoneNumber:
 *             type: string
 *         isDefault:
 *             type: boolean
 *             default: false
 */

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
 *          item:
 *             schema:
 *                $ref: '#/components/schema/CustomerAddressList'
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
        fullName: {
          type: String,
        },
        address: {
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
