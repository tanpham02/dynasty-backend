import { Schema, model } from 'mongoose';
import Voucher, { PromotionsType, SaleScope } from '../types/vouchers.type';
import { Status } from '@app/types';

const voucherSchema = new Schema<Voucher>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    startDate: {
      // *************
      type: Date,
      required: true,
    },
    endDate: {
      // *************
      type: Date,
      required: true,
    },
    saleScope: {
      type: String,
      enum: SaleScope,
    },
    promotionType: {
      type: String,
      enum: PromotionsType,
    },
    discount: {
      type: Number,
    },
    discountPercent: {
      type: Number,
    },
    maximumReducedAmountMoney: {
      type: Number,
    },
    totalQuantityVoucher: {
      type: Number,
    },
    minimumOrderValue: {
      type: Number,
    },
    listProductUsedVoucher: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    status: {
      type: String,
      enum: Status,
      default: Status.ACTIVE,
    },

    customerIdsUsedVoucher: [
      {
        type: [String],
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

const VoucherModel = model('Voucher', voucherSchema);

export default VoucherModel;
