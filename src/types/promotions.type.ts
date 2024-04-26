import { Document, Schema } from 'mongoose';
import { BaseModel } from './common.types';

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
 *                    $ref: '#/components/schemas/Products'
 */

interface Promotion extends BaseModel {
  name?: string;
  description?: string;
  banner?: string;
  promotionsList?: PromotionsList[];
}

interface PromotionsList extends BaseModel {
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
