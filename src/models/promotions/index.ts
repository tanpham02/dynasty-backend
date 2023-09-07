import { Schema, model } from 'mongoose';
import { Promotions, PromotionsChild } from './@type';

const PromotionSchemaChild = new Schema<PromotionsChild>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    comboPromotionsId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ComboPromotions',
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

const PromotionSchema = new Schema<Promotions>(
  { promotionChild: [PromotionSchemaChild] },
  { timestamps: true, versionKey: false },
);

const PromotionsModel = model('Promotion', PromotionSchema);

export default PromotionsModel;
