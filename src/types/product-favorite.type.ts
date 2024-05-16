import { BaseModel, Product } from '@app/types';

interface ProductFavorite extends BaseModel {
  customerId?: string;
  products?: Product[];
}

export { ProductFavorite };
