import { Schema, model } from 'mongoose';
import { ProductAttribute } from '../types/product-attributes.type';

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
 *         attributeList:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  name:
 *                     type: string
 *                  value:
 *                     type: string
 */

export const ProductAttributeSchema = new Schema<ProductAttribute>(
  {
    name: {
      type: String,
      required: true,
    },
    attributeList: [
      {
        name: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const ProductAttributeModel = model('ProductAttribute', ProductAttributeSchema);

export default ProductAttributeModel;
