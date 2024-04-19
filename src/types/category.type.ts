import { BaseModel } from '@app/types/common.types';

interface Category extends BaseModel {
  _id?: string;
  name: string;
  childrenCategory?: ChildCategory;
  products?: string[];
  priority?: number;
  visible?: boolean;
  isShowHomePage?: boolean;
  avatar?: string;
  slug?: string;
}

interface ChildCategory {
  parentId?: string;
  category?: Category[];
}
export { Category, ChildCategory };
