import { BaseModel } from './common.types';

interface CartProduct {
  product?: string;
  note?: string;
  productQuantities: number;
}

interface Carts extends BaseModel {
  customerId?: string;
  products?: CartProduct[];
  quantities?: number;
  total?: number;
}

enum ActionType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export { Carts, ActionType };
