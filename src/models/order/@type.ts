import { Schema, Document } from 'mongoose';
import { Status } from '@app/constants';

interface Order extends Document {
  _id?: Schema.Types.ObjectId;
  totalOrder?: number;
  totalBeforeUseDiscount?: number;
  shipFee?: number;
  totalMoneyDiscount?: number;
  customerId?: Schema.Types.ObjectId;
  productId?: Schema.Types.ObjectId;
  quantity?: number;
  status?: Status;
}

export { Order };
