import { Schema, model } from 'mongoose';
import ShopSystem from './@type';
import StoreSystem from './@type';

// RESPONSE DESCRIPTION

/**
 * @swagger
 * components:
 *   schema:
 *     Store System:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         location:
 *           type: string
 *         phone:
 *             type: string
 *         cityId:
 *           type: number
 *         city:
 *             type: string
 *         districtId:
 *           type: number
 *         district:
 *             type: string
 *         wardId:
 *           type: number
 *         ward:
 *             type: string
 *         latitude:
 *           type: string
 *         longitude:
 *             type: string
 */

const StoreSystemSchema = new Schema<StoreSystem>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
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
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      required: true,
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

const StoreSystemModel = model('StoreSystem', StoreSystemSchema);

export default StoreSystemModel;
