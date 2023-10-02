import { Schema, Types, Model, model } from 'mongoose';
import { Order, StatusOrder, TimeOrder, TypeOrder } from './@type';
import { CartSchema } from '../cart';

// SCHEMAS RESPONSE

/**
 * @swagger
 * components:
 *   schema:
 *     Order:
 *       type: object
 *       properties:
 *          customerId:
 *              $ref: '#/components/schema/Customer'
 *          productFromCart:
 *                 $ref: '#/components/schema/Cart'
 *          shipFee:
 *              type: number
 *          totalOrderAmountBeforeUseDiscount:
 *              type: number
 *          statusOrder:
 *              type: string
 *              enum:
 *                 - PENDING
 *                 - DELIVERING
 *                 - SUCCESS
 *                 - FAIL
 *              default: 'PENDING'
 *          fullName:
 *              type: string
 *          phoneNumber:
 *              type: string
 *          address:
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
 *          totalOrder:
 *              type: number
 *          typeOrder:
 *              type: string
 *              enum:
 *                 - ORDER_TO_PICK_UP
 *                 - ORDER_DELIVERING
 *              default: 'ORDER_DELIVERING'
 *          timeOrder:
 *              type: string
 *              enum:
 *                 - NOW
 *                 - SELECT_DATE_TIME
 *              default: 'NOW'
 *          voucherId:
 *              $ref: '#/components/schema/Voucher'
 *          systemStoreId:
 *              $ref: '#/components/schema/Shop System'
 */
const OrderSchema = new Schema<Order>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    productFromCart: {
      type: CartSchema,
    },

    shipFee: {
      type: Number,
    },
    totalOrderAmountBeforeUseDiscount: {
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
    address: {
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
    totalOrder: {
      type: Number,
    },
    typeOrder: {
      type: String,
      enum: TypeOrder,
    },
    timeOrder: {
      type: String,
      enum: TimeOrder,
    },
    dateSelect: {
      type: Date,
    },
    timeSelect: {
      type: Date,
    },
    voucherId: {
      type: String,
    },
    systemStoreId: {
      type: String,
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
