import { Schema, model } from 'mongoose';
import StoreConfig from './@type';

// SCHEMA RESPONSE

/**
 * @swagger
 * components:
 *   schema:
 *     Store Config:
 *       type: object
 *       properties:
 *         feeShip:
 *             type: number
 *         purchasingGuide:
 *             type: string
 *         reasonOrderCancel:
 *             type: array
 *             items:
 *               type: string
 *         hotlineSupport:
 *             type: object
 *             properties:
 *                order:
 *                   type: string
 *                customerCareHotline:
 *                   type: string
 */

const StoreConfigSchema = new Schema<StoreConfig>(
  {
    feeShip: {
      type: Number,
    },
    purchasingGuide: {
      type: String,
    },
    reasonOrderCancel: {
      type: [String],
    },
    hotlineSupport: {
      order: {
        type: String,
      },
      customerCareHotline: {
        type: String,
      },
    },
  },
  { timestamps: true, versionKey: false },
);

const StoreConfigModel = model('StoreConfig', StoreConfigSchema);

export default StoreConfigModel;
