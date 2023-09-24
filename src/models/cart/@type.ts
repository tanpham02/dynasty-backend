import { Schema, Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - customerId
 *         - products
 *       properties:
 *         customerId:
 *           type: string
 *         products:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  productVariant:
 *                     type: object
 *                     properties:
 *                          size:
 *                             type: string
 *                          base:
 *                             type: string
 *                  productId:
 *                     $ref: '#/components/schema/Product'
 *                  note:
 *                     type: string
 *                  quantityProducts:
 *                     type: number
 *         quantity:
 *           type: number
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - customerId
 *         - products
 *       properties:
 *         customerId:
 *           type: string
 *         products:
 *           type: array
 *           item:
 *              schema:
 *                  $ref: '#/components/schema/CartProduct'
 *         quantity:
 *             type: number
 */

interface CartProduct extends Document {
  productId?: Schema.Types.ObjectId;
  productVariant?: {
    size?: string;
    base?: string;
  };
  note?: string;
  quantityProducts: number;
}
interface Cart extends Document {
  customerId: Schema.Types.ObjectId;
  products?: CartProduct[];
  quantity: number;
}

export { Cart, CartProduct };
