import { Document } from 'mongoose';
import { Product } from '../products/@type';

export interface ProductFavorite extends Document {
  _id?: string;
  customerId?: string;
  products?: Product[];
}
