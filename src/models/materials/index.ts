import moment from 'moment';
import { Material } from './@type';
import { Schema, model } from 'mongoose';
import { TIME_ZONE_VIET_NAME } from '@app/utils/date';

// SCHEMAS RESPONSE

/**
 * @swagger
 * components:
 *   schema:
 *     Materials:
 *       type: object
 *       properties:
 *         importDate:
 *           type: string
 *           description: VD 2023-09-15
 *         materialInfo:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                    type: string
 *                 price:
 *                    type: number
 *                 quantityImport:
 *                    type: number
 *                 remainingQuantity:
 *                    type: number
 *                 unit:
 *                    type: string
 *         totalPrice:
 *           type: number
 */

const MaterialSchema = new Schema<Material>(
  {
    importDate: {
      type: Date,
    },
    materialInfo: [
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantityImport: {
          type: Number,
        },
        remainingQuantity: {
          type: Number,
        },
        unit: {
          type: String,
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
  },
  {
    timestamps: {
      currentTime() {
        const now = new Date();
        const strictUTC = moment(now).utc(true);
        const dayAdjustment = strictUTC.clone().tz(TIME_ZONE_VIET_NAME);
        return Number(dayAdjustment);
      },
    },
    versionKey: false,
  },
);

const MaterialMode = model('Material', MaterialSchema);

export default MaterialMode;
