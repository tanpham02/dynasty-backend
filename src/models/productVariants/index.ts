import { Schema, model } from 'mongoose';
import { ProductVariants } from './@type';
import { ProductSchema } from '../products';

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

const ProductVariantSchema = new Schema<ProductVariants>(
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
