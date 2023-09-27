import { Schema, Model, model } from 'mongoose';
import { ActionType, Cart, CartProduct } from './@type';

// SCHEMAS RESPONSE

/**
 * @swagger
 * components:
 *   schema:
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
 *   schema:
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
 */

const CartProductSchema = new Schema<CartProduct>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    note: {
      type: String,
    },
    quantityProducts: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true },
);

const CartSchema = new Schema<Cart>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    products: [CartProductSchema],
    quantity: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true },
);

const CartModel = model('Cart', CartSchema);

export default CartModel;
