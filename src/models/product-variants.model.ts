import { Schema, model } from 'mongoose';
import { ProductVariants } from '../types/product-variants.type';
import { ProductSchema } from './products.model';

export const ProductVariantSchema = new Schema<ProductVariants>(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    productItem: {
      type: ProductSchema,
    },
    attributeUsing: {
      type: [String],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const ProductVariantModel = model('ProductVariant', ProductVariantSchema);

export default ProductVariantModel;
