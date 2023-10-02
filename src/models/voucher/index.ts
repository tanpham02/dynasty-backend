import { Schema, model } from 'mongoose';
import Voucher, { PromotionsType, SaleScope } from './@type';
import { Status } from '@app/constants';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schema:
 *     Voucher:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - code
 *         - startDate
 *         - endDate
 *         - saleScope
 *         - promotionType
 *         - discount
 *         - discountPercent
 *         - maximumReducedAmountMoney
 *         - totalQuantityVoucher
 *         - maxQuantityUseInUser
 *         - minimumOrderValue
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         code:
 *             type: string
 *         startDate:
 *           type: date
 *           description: VD 2023-09-09T22:25:17
 *         endDate:
 *           type: date
 *           description: VD 2023-09-09T22:25:17
 *         saleScope:
 *           type: string
 *           enum:
 *               - ALL
 *               - BY_PRODUCT
 *         promotionType:
 *             type: string
 *             enum:
 *                 - DISCOUNT_BY_MONEY
 *                 - DISCOUNT_BY_PERCENT
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
 *         customerIdsUsedVoucher:
 *           type: array
 *           items:
 *              type: string
 *         listProductUsedVoucher:
 *           type: array
 *           items:
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
