import { Schema, model } from 'mongoose';

import { Carts } from '../types/carts.type';

const CartSchema = new Schema<Carts>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'ProductVariant',
        },
        note: {
          type: String,
        },
        productQuantities: {
          type: Number,
        },
      },
    ],
    quantities: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true },
);

const CartModel = model('Cart', CartSchema);

export default CartModel;
export { CartSchema };
