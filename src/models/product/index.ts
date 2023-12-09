import { Schema, model } from 'mongoose';
import { Product, ProductType } from './@type';
import { ProductStatus } from '@app/constants';
import { ProductAttributeSchema } from '../productAttribute';

// RESPONSE  DESCRIPTION
/**
 * @swagger
 * components:
 *   schema:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         categoryId:
 *           type: string
 *         description:
 *           type: string
 *         information:
 *           type: string
 *         image:
 *           type: string
 *         price:
 *           type: number
 *         oldPrice:
 *           type: number
 *         orderQuantity:
 *           type: number
 *         status:
 *           type: string
 *           enum:
 *              - ACTIVE
 *              - IN_ACTIVE
 *           default: "ACTIVE"
 *         types:
 *           type: string
 *           enum:
 *              - NORMAL
 *              - NEW
 *              - BEST_SELLER
 *              - DELICIOUS_MUST_TRY
 *              - VEGETARIAN
 *              - SPICY
 *              - UNIQUE
 *         attribute:
 *           type: array
 *           items:
 *              type: string
 *         productAttributeList:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                attributeId:
 *                  type: string
 *                name:
 *                   type: string
 *                value:
 *                   type: string
 *                priceAdjustment:
 *                   type: string
 *                priceAdjustmentValue:
 *                   type: number
 *         productsVariant:
 *           type: array
 *           items:
 *              type: string
 */

const ProductSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    information: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    image: {
      type: String,
    },
    images: {
      type: [String],
    },
    status: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.ACTIVE,
    },
    types: {
      type: [String],
      enum: ProductType,
      default: [ProductType.NORMAL],
    },
    orderQuantity: {
      type: Number,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    attribute: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ProductAttribute',
      },
    ],
    productAttributeList: [
      {
        attributeId: {
          type: Schema.Types.ObjectId,
        },
        name: {
          type: String,
        },
        value: {
          type: String,
        },
        priceAdjustment: {
          type: String,
        },
        priceAdjustmentValue: {
          type: Number,
        },
      },
    ],
    productsVariant: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ProductVariant',
      },
    ],
    slug: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const ProductModel = model('Product', ProductSchema);

export default ProductModel;
export { ProductSchema };
