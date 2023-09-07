import { Schema, Document } from 'mongoose';

interface PromotionsChild extends Document {
  name?: string;
  description?: string;
  image?: string;
  comboPromotionsId?: Schema.Types.ObjectId[];
}

interface Promotions extends Document {
  promotionChild: PromotionsChild[];
}

export { PromotionsChild, Promotions };
