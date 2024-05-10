import { Schema, model } from 'mongoose';

import { OrderReceivingTime, OrderStatus, OrderType, Orders, PaymentMethods } from '@app/types';
import { timeByLocalTimeZone } from '@app/utils';

const OrderSchema = new Schema<Orders>(
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
        quantity: {
          type: Number,
        },
      },
    ],
    shipFee: {
      type: Number,
    },
    orderStatus: {
      type: String,
      enum: OrderStatus,
    },
    fullName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    location: {
      type: String,
    },
    city: {
      type: String,
    },
    cityId: {
      type: String,
    },
    district: {
      type: String,
    },
    districtId: {
      type: String,
    },
    ward: {
      type: String,
    },
    wardId: {
      type: String,
    },
    orderType: {
      type: String,
      enum: OrderType,
    },
    orderReceivingTime: {
      type: String,
      enum: OrderReceivingTime,
    },
    orderReceivingTimeAt: {
      type: Date,
    },
    voucherId: {
      type: Schema.Types.ObjectId,
      ref: 'Voucher',
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'StoreSystem',
    },
    reasonCancel: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: PaymentMethods,
    },
    note: {
      type: String,
    },
    subTotal: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  {
    timestamps: {
      currentTime: () => timeByLocalTimeZone(),
    },
    versionKey: false,
  },
);

const OrderModel = model('Order', OrderSchema);

export default OrderModel;
