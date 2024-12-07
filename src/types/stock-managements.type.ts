import { Document } from 'mongoose';
import { Ingredients } from './ingredients.type';

export enum StockManagementTypes {
  IMPORT = 'IMPORT',
  EXPORT = 'EXPORT',
}

interface StockManagements extends Document {
  date?: string | Date;
  type?: StockManagementTypes;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  stockManagementInfo?: Ingredients[];
  stockManagementInfoRef?: string;
  totalPrice?: number;
  note?: string;
  isExported: boolean;
}

export { StockManagements };
