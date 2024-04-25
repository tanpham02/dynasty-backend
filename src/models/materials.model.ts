import moment from 'moment';
import { Schema, model } from 'mongoose';

import { TIME_ZONE_VIET_NAME } from '@app/utils/date.util';
import { Material } from '../types/materials.type';

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
