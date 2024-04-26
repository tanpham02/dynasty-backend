import { BaseModel } from '@app/types/common.types';

interface ProductAttributeItem {
  name?: string;
  value?: string;
}
interface ProductAttribute extends BaseModel {
  name?: string;
  attributeList?: ProductAttributeItem[];
}

export { ProductAttribute };
