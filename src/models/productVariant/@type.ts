import { Status } from '@app/constants';
import { Schema, Document } from 'mongoose';

enum ProductVariantSizeType {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

enum ProductVariantBaseType {
  PAN = 'PAN',
  CRISPY_THIN = 'CRISPY_THIN',
  EXTREME_CHEESE = 'EXTREME_CHEESE',
  EXTREME_SAUSAGE_CHEESE = 'EXTREME_SAUSAGE_CHEESE',
}

interface ProductVariantSize {
  size?: ProductVariantSizeType;
  priceVariant?: number;
}

interface ProductVariantBase {
  base?: ProductVariantBaseType;
  priceVariant?: number;
}

interface ProductVariants extends Document {
  _id?: Schema.Types.ObjectId;
  productId?: Schema.Types.ObjectId;
  sizeVariant?: ProductVariantSize[];
  baseVariant?: ProductVariantBase[];
  status?: Status;
}

export { ProductVariants, ProductVariantBaseType, ProductVariantSizeType };
