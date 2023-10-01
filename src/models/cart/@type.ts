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
 *                  productId:
 *                     type: string
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
 *         totalCart:
 *           type: number
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartRequest:
 *       type: object
 *       properties:
 *         products:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              note:
 *                type: string
 *              productId:
 *                type: string
 *              quantityProducts:
 *                type: number
 *              actionType:
 *                type: string
 *                enum:
 *                   - ADD
 *                   - UPDATE
 *                   - DELETE
 */

interface CartProduct extends Document {
  productId?: Schema.Types.ObjectId;
  note?: string;
  quantityProducts: number;
}
interface Cart extends Document {
  customerId: Schema.Types.ObjectId;
  products?: CartProduct[];
  quantity: number;
  totalCart: number;
}

enum ActionType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export { Cart, CartProduct, ActionType };
