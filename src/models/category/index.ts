import { Schema, model } from 'mongoose';
import { Category } from './@type';
import { Status } from '@app/constants';

/**
 * @swagger
 * components:
 *  schema:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *        - timestamps
 *      properties:
 *        name:
 *          type: string
 *          default: ""
 *        status:
 *          type: string
 *          default: ""
 *          enum:
 *             - ACTIVE
 *             - IN_ACTIVE
 *        productId:
 *          type: string
 *          default: ""
 *          $ref: '#/components/schemas/Product'
 */

const CategorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Status,
      default: Status.ACTIVE,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'ProductModel',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

CategorySchema.add({ childCategory: { type: [CategorySchema] } });

const CategoryModel = model('Category', CategorySchema);

export default CategoryModel;
