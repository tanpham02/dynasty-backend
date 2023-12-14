import { Schema, model } from 'mongoose';
import { Cart } from './@type';

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

const CartSchema = new Schema<Cart>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    products: [
      {
        productItem: {
          type: Schema.Types.ObjectId,
          ref: 'ProductVariant',
        },
        note: {
          type: String,
        },
        quantityProducts: {
          type: Number,
        },
      },
    ],
    totalQuantity: {
      type: Number,
    },
    totalCart: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true },
);

const CartModel = model('Cart', CartSchema);

export default CartModel;
export { CartSchema };
