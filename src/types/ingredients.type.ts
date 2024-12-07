import { Document } from 'mongoose';

interface Ingredients extends Document {
  name?: string;
  price?: number;
  quantity?: number;
  originQuantity?: number;
  unit?: string;
  shouldDelete?: boolean;
}

export { Ingredients };
