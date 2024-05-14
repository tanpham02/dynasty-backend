import { BaseModel, LocationBaseModel } from './common.types';

enum OrderStatus {
  PENDING = 'PENDING', // Chờ xác nhận
  DELIVERING = 'DELIVERING', // Đang vận chuyển
  CANCELED = 'CANCELED', // Đã hủy
  SUCCESS = 'SUCCESS', // Hoàn thành
  WAITING_FOR_DELIVERING = 'WAITING_FOR_DELIVERING', // Chờ lấy hàng
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT', // Chờ thanh toán
}
enum OrderType {
  PICK_UP = 'PICK_UP', // Đặt đến lấy
  DELIVERY = 'DELIVERY', // Đặt giao hàng
}

enum OrderReceivingTime {
  NOW = 'NOW', // Tối thiểu 15p sau khi đặt hàng thành công
  SELECT_DATE_TIME = 'SELECT_DATE_TIME', // Chọn thời gian
}

enum PaymentMethods {
  CASH = 'CASH', // Tiền mặt
  MOMO = 'MOMO',
  ATM_CARD = 'ATM_CARD',
  SHOPEE_PAY = 'SHOPEE_PAY',
  ZALO_PAY = 'ZALO_PAY',
}

interface OrderProductItem {
  product?: string;
  note?: string;
  quantity?: number;
}
interface Orders extends BaseModel, LocationBaseModel {
  customerId?: string;
  products?: OrderProductItem[];
  shipFee?: number;
  orderStatus?: OrderStatus;
  fullName?: string;
  phoneNumber?: string;
  orderType?: OrderType;
  orderReceivingTime?: OrderReceivingTime;
  orderReceivingTimeAt?: Date | string;
  storeId?: string;
  voucherId?: string;
  shipperId?: string;
  reasonCancel?: string;
  paymentMethod?: PaymentMethods;
  note?: string;
  subTotal?: number;
  total?: number;
}

export { OrderReceivingTime, OrderStatus, OrderType, Orders, PaymentMethods };
