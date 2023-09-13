import { Schema, Document } from 'mongoose';

enum StatusOrder {
  PENDING = 'PENDING',
  DELIVERING = 'DELIVERING',
  SUCCESS = 'SUCCESS',
}

interface Order extends Document {
  totalOrderAmount?: number;
  totalOrderAmountBeforeUseDiscount?: number;
  shipFee?: number;
  totalMoneyDiscount?: number;
  customerId?: Schema.Types.ObjectId;
  productIdList?: Schema.Types.ObjectId[];
  quantity?: number;
  statusOrder?: StatusOrder;
  phoneNumber?: string;
  fullName?: string;
  address?: string;
  totalOrder?: number;
}

export { Order };
