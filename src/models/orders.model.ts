import moment from 'moment';
import { Schema, model } from 'mongoose';

import { TIME_ZONE_VIET_NAME } from '@app/utils/date.util';
import {
  Order,
  OrderReceivingTime,
  PaymentMethod,
  StatusCheckout,
  StatusOrder,
  TypeOrder,
} from '../types/orders.type';


const OrderSchema = new Schema<Order>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    productsFromCart: [
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
    productsWhenTheCustomerIsNotLoggedIn: [
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
    shipFee: {
      type: Number,
    },
    totalAmountBeforeUsingDiscount: {
      type: Number,
    },
    statusOrder: {
      type: String,
      enum: StatusOrder,
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
      type: Number,
    },
    district: {
      type: String,
    },
    districtId: {
      type: Number,
    },
    ward: {
      type: String,
    },
    wardId: {
      type: Number,
    },
    typeOrder: {
      type: String,
      enum: TypeOrder,
    },
    orderReceivingTime: {
      type: String,
      enum: OrderReceivingTime,
    },
    dateTimeOrderReceive: {
      type: Date,
    },
    voucherId: {
      type: Schema.Types.ObjectId,
      ref: 'Voucher',
    },
    orderAtStore: {
      type: Schema.Types.ObjectId,
      ref: 'ShopSystem',
    },
    reasonOrderCancel: {
      type: String,
    },
    totalOrder: {
      type: Number,
    },
    statusCheckout: {
      type: String,
      enum: StatusCheckout,
    },
    paymentMethod: {
      type: String,
      enum: PaymentMethod,
    },
    createdAt: {
      type: Date,
      default: moment.tz(Date.now(), TIME_ZONE_VIET_NAME),
    },
    updatedAt: {
      type: Date,
      default: moment.tz(Date.now(), TIME_ZONE_VIET_NAME),
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: {
      currentTime() {
        const now = new Date();
        const strictUTC = moment(now).utc(true);
        const dayAdjustment = strictUTC.clone().tz(TIME_ZONE_VIET_NAME);
        return Number(dayAdjustment);
      },
    },
    versionKey: false,
  },
);

const OrderModel = model('Order', OrderSchema);

export default OrderModel;
