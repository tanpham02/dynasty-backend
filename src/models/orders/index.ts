import { Schema, model } from 'mongoose';
import { Order, StatusOrder, OrderReceivingTime, TypeOrder } from './@type';
import { CartSchema } from '../carts';

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
 *              default: 'PENDING'
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
 *          orderedStoreId:
 *              type: string
 *              description: references to the document Shop Store
 *          reasonOrderCancel:
 *              type: string
 *          totalOrder:
 *              type: number
 *          createdAt:
 *              type: number
 *          updatedAt:
 *              type: number
 */

const OrderSchema = new Schema<Order>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    productsFromCart: {
      type: CartSchema,
    },
    shipFee: {
      type: Number,
    },
    totalAmountBeforeUsingDiscount: {
      type: Number,
    },
    statusOrder: {
      type: String,
      enum: StatusOrder,
      default: StatusOrder.PENDING,
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
    orderedStoreId: {
      type: Schema.Types.ObjectId,
      ref: 'ShopSystem',
    },
    reasonOrderCancel: {
      type: String,
    },
    totalOrder: {
      type: Number,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

const OrderModel = model('Order', OrderSchema);

export default OrderModel;
