import { BaseModel } from '@app/types';

enum ProductType {
  NORMAL = 'NORMAL', // bình thường
  NEW = 'NEW', // mới
  BEST_SELLER = 'BEST_SELLER', // bán chạy
  DELICIOUS_MUST_TRY = 'DELICIOUS_MUST_TRY', // ngon phải thử
  VEGETARIAN = 'VEGETARIAN', // chay
  SPICY = 'SPICY', // cay
  UNIQUE = 'UNIQUE', // độc đáo
}

interface ProductAttributeItem {
  extendedIds?: string[];
  extendedNames?: string[];
  priceAdjustmentValues?: number[];
}

interface Product extends BaseModel {
  name: string;
  slug?: string;
  description?: string;
  information?: string;
  categoryId?: string;
  price: number;
  oldPrice?: number; // Don't need to care
  image?: string;
  images?: string[];
  types?: ProductType[];
  orderQuantity?: number;
  visible?: boolean;
  productAttributeList?: ProductAttributeItem[];
  productsVariant?: string[];
  haveProductVariant?: boolean;
}

export { Product, ProductAttributeItem, ProductType };
