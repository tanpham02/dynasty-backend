import { Schema, model } from 'mongoose';
import ShopSystem from './@type';

// RESPONSE DESCRIPTION

/**
 * @swagger
 * components:
 *   schema:
 *     Shop System:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *         - cityId
 *         - city
 *         - districtId
 *         - district
 *         - wardId
 *         - ward
 *       properties:
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         phone:
 *             type: string
 *         cityId:
 *           type: string
 *         city:
 *             type: string
 *         districtId:
 *           type: string
 *         district:
 *             type: string
 *         wardId:
 *           type: string
 *         ward:
 *             type: string
 */

const ShopSystemSchema = new Schema<ShopSystem>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    cityId: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    districtId: {
      type: String,
      required: true,
    },
    district: {
      required: true,
      type: String,
    },
    ward: {
      type: String,
      required: true,
    },
    wardId: {
      required: true,
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

const ShopSystemModel = model('ShopSystem', ShopSystemSchema);

export default ShopSystemModel;
