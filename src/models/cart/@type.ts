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
 *                  productItem:
 *                     $ref: '#/components/schema/Product'
 *                     description: This is field ObjectId (Use populate to retries data)
 *                  note:
 *                     type: string
 *                  quantityProducts:
 *                     type: number
 *         totalQuantity:
 *           type: number
 *         totalCart:
 *           type: number
 */

interface Cart extends Document {
  customerId: Schema.Types.ObjectId;
  products?: Array<{
    productId?: Schema.Types.ObjectId;
    note?: string;
    productQuantities: number;
  }>;
  totalQuantity: number;
  totalCart: number;
}

enum ActionType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export { Cart, ActionType };
