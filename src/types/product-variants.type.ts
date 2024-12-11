import { BaseModel } from '@app/types';
import { Product } from './products.type';

interface ProductVariants extends BaseModel {
  parentId?: string;
  productItem?: Product;
  attributeUsing?: string[];
}

export { ProductVariants };
