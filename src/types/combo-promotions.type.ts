import { Schema, Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
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
 *                    $ref: '#/components/schema/Products'
 */

interface ComboPromotions extends Document {
  categoryId?: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId[];
  name?: string;
  comboPrice?: number;
  image?: string;
}

export default ComboPromotions;
