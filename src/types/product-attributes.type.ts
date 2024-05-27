import { BaseModel } from '@app/types';

interface AttributeItem extends BaseModel {
  label?: string;
}
interface ProductAttribute extends BaseModel {
  categoryId: string;
  name: string;
  attributeList?: AttributeItem[];
}

export { ProductAttribute, AttributeItem };
