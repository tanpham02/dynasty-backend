import { Schema, Document } from 'mongoose';

interface CartProduct extends Document {
  productId?: Schema.Types.ObjectId;
  note?: string;
}
interface Cart extends Document {
  customerId: Schema.Types.ObjectId;
  products?: CartProduct[];
  quantity: number;
  
}

export { Cart, CartProduct };
