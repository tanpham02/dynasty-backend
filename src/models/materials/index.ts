import moment from 'moment';
import { Material } from './@type';
import { Schema, model } from 'mongoose';
import { TIME_ZONE_VIET_NAME, YYYY_MM_DDTHH_MM_SS, YYYY_MM_DD_HH_MM_SS } from '@app/utils/date';

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
 *                 quantity:
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
      default: moment().tz('Asia/Ho_Chi_Minh'),
    },
    materialInfo: [
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
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

const MaterialModel = model('Material', MaterialSchema);

export default MaterialModel;
