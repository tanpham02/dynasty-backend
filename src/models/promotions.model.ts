import { Schema, model } from 'mongoose';
import { Promotion, PromotionsList } from '../types/promotions.type';

// SCHEMAS RESPONSE

/**
 * @swagger
 * components:
 *   schema:
 *     Promotions:
 *       type: object
 *       properties:
 *         name:
 *             type: string
 *         description:
 *             type: string
 *         banner:
 *             type: string
 *         promotionsList:
 *             type: array
 *             item:
 *                schema:
 *                    $ref: '#/components/schema/Product'
 */

const PromotionSchemaList = new Schema<PromotionsList>(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    productIsPurchasedId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },

    productDonatedId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    price: {
      type: Number,
    },
    size: {
      type: String,
    },
    base: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

const PromotionSchema = new Schema<Promotion>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    banner: {
      type: String,
    },
    promotionsList: [PromotionSchemaList],
  },
  { timestamps: true, versionKey: false },
);

const PromotionsModel = model('Promotions', PromotionSchema);

export default PromotionsModel;

export { PromotionSchema };
