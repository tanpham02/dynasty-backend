import { Schema, Types, Model, model } from 'mongoose';
import { Order } from './@type';

const OrderSchema = new Schema<Order>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    productIdList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    shipFee: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    totalOrderAmount: {
      type: Number,
    },
    totalOrderAmountBeforeUseDiscount: {
      type: Number,
    },
    totalMoneyDiscount: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const OrderModel = model('Order', OrderSchema);

export default OrderModel;
