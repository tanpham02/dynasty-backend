import { Schema, Document } from 'mongoose';

interface CartProduct extends Document {
  productId?: Schema.Types.ObjectId;
  productVariant?: {
    size?: string;
    base?: string;
  };
  note?: string;
  quantityProducts: number;
}
interface Cart extends Document {
  customerId: Schema.Types.ObjectId;
  products?: CartProduct[];
  quantity: number;
}

export { Cart, CartProduct };
