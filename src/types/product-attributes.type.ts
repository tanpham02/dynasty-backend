import { BaseModel } from '@app/types';

interface ProductAttributeItem extends BaseModel {
  label?: string;
}
interface ProductAttribute extends BaseModel {
  categoryId: string;
  name: string;
  attributeList?: ProductAttributeItem[];
}

export { ProductAttribute };
