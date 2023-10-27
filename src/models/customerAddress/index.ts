import { Schema, model } from 'mongoose';
import { CustomerAddressList } from './@type';

// SCHEMAS RESPONSE

/**
 * @swagger
 * components:
 *   schema:
 *     CustomerAddressItem:
 *       type: object
 *       properties:
 *         city:
 *             type: string
 *         cityId:
 *             type: number
 *         district:
 *             type: string
 *         districtId:
 *             type: number
 *         ward:
 *             type: string
 *         wardId:
 *             type: number
 *         address:
 *             type: string
 *         fullName:
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
 *     CustomerAddressList:
 *       type: object
 *       properties:
 *         customerId:
 *            type: string
 *         addressList:
 *          type: array
 *          items:
 *             schema:
 *                $ref: '#/components/schema/CustomerAddressItem'
 */

const CustomerAddressSchema = new Schema<CustomerAddressList>(
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
