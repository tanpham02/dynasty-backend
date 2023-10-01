import { Document } from 'mongoose';

interface MaterialInformation extends Document {
  name?: string;
  price?: number;
  quantity?: string;
}
interface Material extends Document {
  importDate?: string | Date;
  materialInfo?: MaterialInformation[];
  totalPrice?: number;
}
