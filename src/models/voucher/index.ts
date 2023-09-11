import { Schema, model } from 'mongoose';
import Voucher, { PromotionsType, SaleScope } from './@type';
import { Status } from '@app/constants';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     Voucher:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - code
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         code:
 *             type: string
 *         startDate:
 *           type: date
 *         endDate:
 *           type: date
 *         saleScope:
 *           type: string
 *           enum: [ALL, BY_PRODUCT]
 *         promotionType:
 *             type: string
 *             enum: [DISCOUNT_BY_MONEY, DISCOUNT_BY_PERCENT]
 *         discount:
 *           type: number
 *         discountPercent:
 *             type: string
 *         maximumReducedAmountMoney:
 *           type: number
 *         totalQuantityVoucher:
 *             type: string
 *         maxQuantityUseInUser:
 *           type: number
 *         minimumOrderValue:
 *           type: string
 *         listProductUsedVoucher:
 *           type: array
 *           item:
 *              $ref: '#/components/schema/Product'
 */

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
    },
    endDate: {
      // *************
      type: Date,
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
    maxQuantityUseInUser: {
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

    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
  },
  { timestamps: true, versionKey: false },
);

const VoucherModel = model('Voucher', voucherSchema);

export default VoucherModel;
