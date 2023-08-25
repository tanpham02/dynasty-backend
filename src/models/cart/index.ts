import { Schema, Model, model } from 'mongoose';
import { Cart } from './@type';
import { Status } from '@app/constants';

const CartSchema = new Schema<Cart, Model<Cart>>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      enum: Status,
      default: Status.ACTIVE,
    },
    cartTotal: {
      type: Number,
    },
    productDetail: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

const CartModel = model('Cart', CartSchema);

export default CartModel;
