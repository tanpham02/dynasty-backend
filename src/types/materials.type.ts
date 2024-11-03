import { Document } from 'mongoose';

interface Material extends Document {
  importDate?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  materialInfo?: Array<{
    name?: string;
    price?: number;
    quantity?: number;
    unit?: string;
  }>;
  totalPrice?: number;
}

export { Material };
