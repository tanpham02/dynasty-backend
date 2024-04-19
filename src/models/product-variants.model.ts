import { Schema, model } from 'mongoose';
import { ProductVariants } from '../types/product-variants.type';
import { ProductSchema } from './products.model';

// RESPONSE  DESCRIPTION
/**
 * @swagger
 * components:
 *   schema:
 *     ProductVariant:
 *       type: object
 *       properties:
 *         parentId:
 *           type: string
 *         productItem:
 *           $ref: '#/components/schema/Product'
 */

export const ProductVariantSchema = new Schema<ProductVariants>(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    productItem: {
      type: ProductSchema,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const ProductVariantModel = model('ProductVariant', ProductVariantSchema);

export default ProductVariantModel;
