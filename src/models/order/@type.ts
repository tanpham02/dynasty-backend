import { Schema, Document } from 'mongoose';
import { Cart } from '../cart/@type';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - customerId
 *         - productIdList
 *         - shipFee
 *         - quantity
 *         - totalOrderAmountBeforeUseDiscount
 *         - statusOrder
 *         - fullName
 *         - phoneNumber
 *         - address
 *         - city
 *         - cityId
 *         - district
 *         - districtId
 *         - ward
 *         - wardId
 *         - totalOrder
 *         - typeOrder
 *         - timeOrder
 *         - voucherId
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
 */

enum StatusOrder {
  PENDING = 'PENDING',
  DELIVERING = 'DELIVERING',
  FAIL = 'FAIL',
  SUCCESS = 'SUCCESS',
}
enum TypeOrder {
  ORDER_TO_PICK_UP = 'ORDER_TO_PICK_UP',
  ORDER_DELIVERING = 'ORDER_DELIVERING',
}

enum TimeOrder {
  NOW = 'NOW',
  SELECT_DATE_TIME = 'SELECT_DATE_TIME',
}

interface Order extends Document {
  customerId?: Schema.Types.ObjectId;
  productFromCart?: Cart;
  shipFee?: number;
  totalOrderAmountBeforeUseDiscount?: number;
  statusOrder?: StatusOrder;
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  cityId?: number;
  district?: string;
  districtId?: number;
  ward?: string;
  wardId?: number;
  totalOrder?: number;
  typeOrder?: TypeOrder;
  timeOrder: TimeOrder;
  dateSelect?: Date | string;
  timeSelect?: Date | string;
  voucherId?: string;
  systemStoreId?: string;
}

export { Order, StatusOrder, TypeOrder, TimeOrder };
