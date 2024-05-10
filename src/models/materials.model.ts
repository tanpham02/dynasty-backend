import { Schema, model } from 'mongoose';

import { Material } from '@app/types';
import { timeByLocalTimeZone } from '@app/utils';

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
      currentTime: () => timeByLocalTimeZone(),
    },
    versionKey: false,
  },
);

const MaterialModel = model('Material', MaterialSchema);

export default MaterialModel;
