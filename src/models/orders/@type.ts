import { Schema, Document } from 'mongoose';
import { Cart } from '../carts/@type';
import { ProductVariants } from '../productVariants/@type';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductWhenTheCustomerIsNotLoggedInOrderDTO:
 *       type: object
 *       required:
 *         - products
 *       properties:
 *         products:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  product:
 *                     $ref: '#/components/schema/ProductVariant'
 *                  note:
 *                     type: string
 *                  productQuantities:
 *                     type: number
 */

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
 *              $ref: '#/components/schema/Carts'
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
 *          statusCheckout:
 *              type: string
 *              enum:
 *                 - VERIFY_INFORMATION
 *                 - ORDER_CONFIRMATION
 *              default: 'VERIFY_INFORMATION'
 *          paymentMethod:
 *              type: string
 *              enum:
 *                 - PAYMENT_ON_DELIVERY
 *                 - MONO
 *                 - ATM_CARD
 *                 - SHOPEE_PAY
 *                 - ZALO_PAY
 *              default: 'PAYMENT_ON_DELIVERY'
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

enum StatusCheckout {
  VERIFY_INFORMATION = 'VERIFY_INFORMATION', // Bước nhâp thông tin (WAITING_FOR_PAYMENT)
  ORDER_CONFIRMATION = 'ORDER_CONFIRMATION', // Bước xác nhận đăt hàng, chọn phương thức thanh toán = > chờ xác nhân (PENDING)
}

enum PaymentMethod {
  PAYMENT_ON_DELIVERY = 'PAYMENT_ON_DELIVERY', // Thanh toán khi nhân hàng
  MONO = 'MONO',
  ATM_CARD = 'ATM_CARD',
  SHOPEE_PAY = 'SHOPEE_PAY',
  ZALO_PAY = 'ZALO_PAY',
}

interface Order extends Document {
  _id?: Schema.Types.ObjectId;
  customerId?: Schema.Types.ObjectId;
  productsFromCart?: Array<{
    product?: Schema.Types.ObjectId;
    note?: string;
    productQuantities: number;
  }>;
  productsWhenTheCustomerIsNotLoggedIn?: Array<{
    product?: Schema.Types.ObjectId;
    note?: string;
    productQuantities: number;
  }>;
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
  orderReceivingTime?: OrderReceivingTime;
  dateTimeOrderReceive?: Date | string;
  voucherId?: Schema.Types.ObjectId;
  orderAtStore?: Schema.Types.ObjectId;
  reasonOrderCancel?: string;
  totalOrder?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  statusCheckout?: StatusCheckout;
  paymentMethod?: PaymentMethod;
  note?: string;
}

export { Order, StatusOrder, TypeOrder, OrderReceivingTime, StatusCheckout, PaymentMethod };
