import { BaseModel } from '@app/types';
import { Schema } from 'mongoose';

interface AttributeItem extends BaseModel {
  label?: string;
}

interface ProductAttribute extends BaseModel {
  categoryId: Schema.Types.ObjectId;
  name: string;
  attributeList?: AttributeItem[];
}

export { ProductAttribute, AttributeItem };
