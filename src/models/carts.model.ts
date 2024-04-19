import { Schema, model } from 'mongoose';
import { Carts } from '../types/carts.type';

// SCHEMAS RESPONSE

/**
 * @swagger
 * components:
 *   schema:
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
 *         quantities:
 *           type: number
 *         total:
 *           type: number
 */

const CartSchema = new Schema<Carts>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'ProductVariant',
        },
        note: {
          type: String,
        },
        productQuantities: {
          type: Number,
        },
      },
    ],
    quantities: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true },
);

const CartModel = model('Cart', CartSchema);

export default CartModel;
export { CartSchema };
