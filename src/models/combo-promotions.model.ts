import { Schema, model } from 'mongoose';
import ComboPromotions from '../types/combo-promotions.type';

const ComboPromotionsSchema = new Schema<ComboPromotions>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    productId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    name: {
      type: String,
      unique: true,
    },
    comboPrice: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

const ComboPromotionsModel = model('ComboPromotions', ComboPromotionsSchema);

export default ComboPromotionsModel;
export { ComboPromotionsSchema };
