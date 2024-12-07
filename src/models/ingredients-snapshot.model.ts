import { model, Schema } from 'mongoose';

import { Ingredients } from '@app/types';

const IngredientSnapshotSchema = new Schema<Ingredients>(
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
  {
    timestamps: true,
    versionKey: false,
  },
);

const IngredientSnapshotModel = model('IngredientSnapshot', IngredientSnapshotSchema);

export default IngredientSnapshotModel;
