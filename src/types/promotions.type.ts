import { Schema, Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     Promotions:
 *       type: object
 *       required:
 *         - name
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

interface Promotion extends Document {
  name?: string;
  description?: string;
  banner?: string;
  promotionsList?: PromotionsList[];
}

interface PromotionsList extends Document {
  name?: string;
  description?: string;
  productIsPurchasedId?: Schema.Types.ObjectId;
  productDonatedId?: Schema.Types.ObjectId;
  price?: number;
  size?: string;
  base?: string;
  image?: string;
}

export { Promotion, PromotionsList };
