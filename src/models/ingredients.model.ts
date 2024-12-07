import { model, Schema } from 'mongoose';

import { Ingredients } from '@app/types';

const IngredientSchema = new Schema<Ingredients>(
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
    originQuantity: {
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

const IngredientModel = model('Ingredient', IngredientSchema);

export default IngredientModel;
