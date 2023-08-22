import { Schema, Types, Model, model } from 'mongoose';
import { Order } from './@type';
import { Status } from '@app/constants';

const OrderSchema = new Schema<Order>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'CustomerModel',
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'ProductModel',
    },
    shipFee: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    status: {
      type: String,
      enum: Status,
      default: Status.ACTIVE,
    },
    totalOrder: {
      type: Number,
    },
    totalBeforeUseDiscount: {
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
