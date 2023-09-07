import { Schema, model } from 'mongoose';
import ComboPromotions from './@type';

/**
 * @swagger
 * components:
 *   schema:
 *     ComboPromotions:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *             type: string
 *         categoryId:
 *             type: string
 *         comboPrice:
 *             type: number
 *         image:
 *             type: string
 *         productId:
 *             type: array
 *             item:
 *                schema:
 *                    $ref: '#/components/schema/Product'
 */

const ComboPromotionsSchema = new Schema<ComboPromotions>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    productId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    name: {
      type: String,
      unique: true,
    },
    comboPrice: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

const ComboPromotionsModel = model('ComboPromotions', ComboPromotionsSchema);

export default ComboPromotionsModel;
export { ComboPromotionsSchema };
