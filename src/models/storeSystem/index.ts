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
 *         address:
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
 */

const StoreSystemSchema = new Schema<StoreSystem>(
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
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    districtId: {
      type: Number,
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
      type: Number,
    },
  },
  { timestamps: true, versionKey: false },
);

const StoreSystemModel = model('StoreSystem', StoreSystemSchema);

export default StoreSystemModel;
