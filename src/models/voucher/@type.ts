import { Status } from '@app/constants';
import { Document, Schema } from 'mongoose';

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
 *         listProductUsedVoucher:
 *           type: array
 *           items:
 *              $ref: '#/components/schema/Product'
 */

export enum SaleScope {
  ALL = 'ALL',
  BY_PRODUCT = 'BY_PRODUCT',
}
export enum PromotionsType {
  DISCOUNT_BY_MONEY = 'DISCOUNT_BY_MONEY',
  DISCOUNT_BY_PERCENT = 'DISCOUNT_BY_PERCENT',
}

interface Voucher extends Document {
  name?: string;
  description?: string;
  code?: string;
  startDate: string | Date;
  endDate: string | Date;
  saleScope?: SaleScope;
  promotionType?: PromotionsType;
  discount?: number;
  discountPercent?: number;
  maximumReducedAmountMoney?: number;
  totalQuantityVoucher?: number;
  minimumOrderValue?: number;
  listProductUsedVoucher?: Schema.Types.ObjectId[];
  customerIdsUsedVoucher?: Schema.Types.ObjectId[];
  status?: Status;
}

export default Voucher;
