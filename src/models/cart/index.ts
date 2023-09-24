import { Schema, Model, model } from 'mongoose';
import { Cart, CartProduct } from './@type';

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

const CartProductSchema = new Schema<CartProduct>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },

    note: {
      type: String,
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
