import { Schema, Model, model } from 'mongoose';
import { Cart, CartProduct } from './@type';
import { Status } from '@app/constants';

const CartProductSchema = new Schema<CartProduct>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },

    note: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

const CartSchema = new Schema<Cart>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    products: [CartProductSchema],
    quantity: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true },
);

const CartModel = model('Cart', CartSchema);

export default CartModel;
