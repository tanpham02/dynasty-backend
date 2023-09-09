import { Schema, Document } from 'mongoose';
import { Status } from '@app/constants';

interface Order extends Document {
  totalOrderAmount?: number;
  totalOrderAmountBeforeUseDiscount?: number;
  shipFee?: number;
  totalMoneyDiscount?: number;
  customerId?: Schema.Types.ObjectId;
  productIdList?: Schema.Types.ObjectId[];
  quantity?: number;
}

export { Order };
