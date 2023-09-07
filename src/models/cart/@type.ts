import { Schema, Document } from 'mongoose';
import { Status } from '@app/constants';

interface Cart extends Document {
  _id?: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  quantity: number;
  productId: Schema.Types.ObjectId;
  size?: string;
  base?: string;
  note?: string;
  status?: Status;
  cartTotal: number;
  productDetail?: string;
}

export { Cart };
