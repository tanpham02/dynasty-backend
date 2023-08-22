import { Status } from '@app/constants';
import { Schema, Document } from 'mongoose';
import { ProductVariants } from '../productVariant/@type';

enum ProductType {
  NORMAL = 'NORMAL',
  NEW = 'NEW',
  BEST_SELLER = 'BEST_SELLER',
}

interface Product extends Document {
  _id?: Schema.Types.ObjectId;
  name: string;
  description?: string;
  information?: String;
  price: number;
  oldPrice?: number;
  importPrice?: number;
  image?: string;
  images?: string[];
  status?: Status;
  types?: ProductType;
  orderQuantity?: number;
  productVariantsId?: Schema.Types.ObjectId;
  productVariantsResponse?: ProductVariants[];
}

export { Product, ProductType };
