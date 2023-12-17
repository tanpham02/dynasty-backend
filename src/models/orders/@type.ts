import { Schema, Document } from 'mongoose';
import { Cart } from '../carts/@type';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
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

enum StatusOrder {
  PENDING = 'PENDING', // Chờ xác nhận
  DELIVERING = 'DELIVERING', // Đang vận chuyển
  CANCELED = 'CANCELED', // Đã hủy
  SUCCESS = 'SUCCESS', // Hoàn thành
  WAITING_FOR_DELIVERING = 'WAITING_FOR_DELIVERING', // Chờ lấy hàng
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT', // Chờ thanh toán
}
enum TypeOrder {
  ORDER_TO_PICK_UP = 'ORDER_TO_PICK_UP', // Đặt đến lấy
  ORDER_DELIVERING = 'ORDER_DELIVERING', // Đặt giao hàng
}

enum OrderReceivingTime {
  NOW = 'NOW', // Tối thiểu 15p sau khi đặt hàng thành công
  SELECT_DATE_TIME = 'SELECT_DATE_TIME', // Chọn thời gian
}

interface Order extends Document {
  customerId?: Schema.Types.ObjectId;
  productsFromCart?: Cart;
  shipFee?: number;
  totalAmountBeforeUsingDiscount?: number;
  statusOrder?: StatusOrder;
  fullName?: string;
  phoneNumber?: string;
  location?: string;
  city?: string;
  cityId?: number;
  district?: string;
  districtId?: number;
  ward?: string;
  wardId?: number;
  typeOrder?: TypeOrder;
  orderReceivingTime: OrderReceivingTime;
  dateTimeOrderReceive?: Date | string;
  voucherId?: Schema.Types.ObjectId;
  orderedStoreId?: Schema.Types.ObjectId;
  reasonOrderCancel?: string;
  totalOrder?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export { Order, StatusOrder, TypeOrder, OrderReceivingTime };
