import { Document } from 'mongoose';
import { Product } from './products.type';

interface ProductFavorite extends Document {
  customerId?: string;
  products?: Product[];
}

export { ProductFavorite };
