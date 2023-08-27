import { Schema, model } from 'mongoose';
import { Category } from './@type';
import { Status } from '@app/constants';

// RESPONSE DESCRIPTION
/**
 * @swagger
 * components:
 *  schema:
 *    Category:
 *      type: object
 *      required:
 *        - name
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
 *        productsDTO:
 *          type: array
 *          item:
 *             $ref: '#/components/schema/Product'
 *
 *        childCategory:
 *          type: array
 *          item:
 *             $ref: '#/components/schema/Category'
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
    productsDTO: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

CategorySchema.add({ childCategory: { type: [CategorySchema] } });

const CategoryModel = model('Category', CategorySchema);

export default CategoryModel;
