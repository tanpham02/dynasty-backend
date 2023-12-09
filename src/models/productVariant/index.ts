import { Schema, model } from 'mongoose';
import { ProductVariants } from './@type';
import { ProductSchema } from '../product';

// RESPONSE  DESCRIPTION
/**
 * @swagger
 * components:
 *   schema:
 *     productVariant:
 *       type: object
 *       properties:
 *         parentId:
 *           type: string
 *         productItem:
 *           $ref: '#/components/schema/Product'
 *         productVariantPairs:
 *           type: array
 *           items:
 *               type: string
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
    productVariantPairs: {
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
