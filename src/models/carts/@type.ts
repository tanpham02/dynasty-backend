import { Schema, Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     Carts:
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
 *                  product:
 *                     $ref: '#/components/schema/Product'
 *                     description: This is field ObjectId (Use populate to retries data)
 *                  note:
 *                     type: string
 *                  productQuantities:
 *                     type: number
 *         totalQuantity:
 *           type: number
 *         totalCart:
 *           type: number
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartDTO:
 *       type: object
 *       properties:
 *           product:
 *              type: string
 *              description: This is field ObjectId (Use populate to retries data)
 *           note:
 *              type: string
 *           productQuantities:
 *              type: number
 */

interface Cart extends Document {
  customerId: Schema.Types.ObjectId;
  products?: Array<{
    product?: Schema.Types.ObjectId;
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
