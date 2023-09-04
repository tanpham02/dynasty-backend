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
 *       properties:
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         phone:
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
  },
  { timestamps: true, versionKey: false },
);

const ShopSystemModel = model('ShopSystem', ShopSystemSchema);

export default ShopSystemModel;
