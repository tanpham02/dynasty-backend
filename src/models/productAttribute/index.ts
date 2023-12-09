import { Schema, model } from 'mongoose';
import { ProductAttribute } from './@type';

// SCHEMAS DESCRIPTION
/**
 * @swagger
 * components:
 *   schema:
 *     ProductAttribute:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 */

export const ProductAttributeSchema = new Schema<ProductAttribute>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const ProductAttributeModel = model('ProductAttribute', ProductAttributeSchema);

export default ProductAttributeModel;
