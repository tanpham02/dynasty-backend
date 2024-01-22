import { Schema, model } from 'mongoose';
import {
  Order,
  StatusOrder,
  OrderReceivingTime,
  TypeOrder,
  StatusCheckout,
  PaymentMethod,
} from './@type';
import { CartSchema } from '../carts';
import { ProductVariantSchema } from '../productVariants';
import moment from 'moment';
import { TIME_ZONE_VIET_NAME } from '@app/utils/date';

// SCHEMAS RESPONSE

/**
 * @swagger
 * components:
 *   schema:
 *     Orders:
 *       type: object
 *       properties:
 *          customerId:
 *              $ref: '#/components/schema/Customers'
 *          productsFromCart:
 *                 $ref: '#/components/schema/Carts'
 *          productsWhenTheCustomerIsNotLoggedIn:
 *              type: array
 *              items:
 *                type: string
 *          _id:
 *              type: string
 *          shipFee:
 *              type: number
 *          totalAmountBeforeUsingDiscount:
 *              type: number
 *          statusOrder:
 *              type: string
 *              enum:
 *                 - PENDING
 *                 - DELIVERING
 *                 - SUCCESS
 *                 - CANCELED
 *                 - WAITING_FOR_DELIVERING
 *                 - WAITING_FOR_PAYMENT
 *              default: 'WAITING_FOR_PAYMENT'
 *          fullName:
 *              type: string
 *          phoneNumber:
 *              type: string
 *          location:
 *              type: string
 *          city:
 *              type: string
 *          cityId:
 *              type: number
 *          district:
 *              type: string
 *          districtId:
 *              type: number
 *          ward:
 *              type: string
 *          wardId:
 *              type: number
 *          typeOrder:
 *              type: string
 *              enum:
 *                 - ORDER_TO_PICK_UP
 *                 - ORDER_DELIVERING
 *              default: 'ORDER_DELIVERING'
 *          paymentMethod:
 *              type: string
 *              enum:
 *                 - PAYMENT_ON_DELIVERY
 *                 - MONO
 *                 - ATM_CARD
 *                 - SHOPEE_PAY
 *                 - ZALO_PAY
 *              default: 'PAYMENT_ON_DELIVERY'
 *          statusCheckout:
 *              type: string
 *              enum:
 *                 - VERIFY_INFORMATION
 *                 - ORDER_CONFIRMATION
 *              default: 'VERIFY_INFORMATION'
 *          orderReceivingTime:
 *              type: string
 *              enum:
 *                 - NOW
 *                 - SELECT_DATE_TIME
 *              default: 'NOW'
 *          dateTimeOrderReceive:
 *             type: string
 *          voucherId:
 *              type: string
 *              description: references to the document Voucher
 *          orderAtStore:
 *              type: string
 *              description: references to the document Shop Store
 *          reasonOrderCancel:
 *              type: string
 *          totalOrder:
 *              type: number
 */

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
      default: moment(new Date()).tz(TIME_ZONE_VIET_NAME),
    },
    // updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    // timestamps: {
    //   currentTime() {
    //     const now = new Date();
    //     const strictUTC = moment(now).utc(true);
    //     const dayAdjustment = strictUTC.clone().tz(TIME_ZONE_VIET_NAME);
    //     return Number(dayAdjustment);
    //   },
    // },
  },
);

const OrderModel = model('Order', OrderSchema);

export default OrderModel;
