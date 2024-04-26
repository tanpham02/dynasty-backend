import { BaseModel } from '@app/types/common.types';
import { Document, Schema } from 'mongoose';

export enum SaleScope {
  ALL = 'ALL',
  BY_PRODUCT = 'BY_PRODUCT',
}
export enum PromotionsType {
  DISCOUNT_BY_MONEY = 'DISCOUNT_BY_MONEY',
  DISCOUNT_BY_PERCENT = 'DISCOUNT_BY_PERCENT',
}

interface Voucher extends BaseModel {
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
  customerIdsUsedVoucher?: string[];
}

export default Voucher;
