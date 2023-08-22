import { Status } from '@app/constants';
import { Schema, Document } from 'mongoose';

interface Category extends Document {
  _id?: Schema.Types.ObjectId;
  name: string;
  status?: Status;
  childCategory?: Category[];
  productId?: Schema.Types.ObjectId;
}

export { Category };
