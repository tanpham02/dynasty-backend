import { Schema, model } from 'mongoose';
import { Product, ProductType, ProductVariantBaseType, ProductVariantSizeType } from './@type';
import { ProductStatus } from '@app/constants';

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
 *         price:
 *           type: number
 *         oldPrice:
 *           type: number
 *         description:
 *           type: string
 *         information:
 *           type: string
 *         image:
 *           type: string
 *         orderQuantity:
 *           type: number
 *         status:
 *           type: string
 *           enum:
 *              - ACTIVE
 *              - IN_ACTIVE
 *         types:
 *           type: array
 *           enum:
 *              - NORMAL
 *              - NEW
 *              - BEST_SELLER
 *              - DELICIOUS_MUST_TRY
 *              - VEGETARIAN
 *              - SPICY
 *         productVariantId:
 *           type: string
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
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

ProductSchema.add({
  attribute: [
    {
      attributeName: {
        type: String,
      },
      attributeList: [
        {
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
      productVariantList: [ProductSchema],
    },
  ],
});

const ProductModel = model('Product', ProductSchema);

export default ProductModel;
