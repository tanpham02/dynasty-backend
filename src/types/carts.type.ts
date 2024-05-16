import { BaseModel } from './common.types';

interface CartProduct extends BaseModel {
  product?: string;
  note?: string;
  quantity?: number;
}

interface Carts extends BaseModel {
  customerId?: string;
  products?: CartProduct[];
  quantity?: number;
  total?: number;
}

export { Carts, CartProduct };
