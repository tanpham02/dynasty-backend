import { Schema, Model, model } from 'mongoose';
import {
  ProductVariantBaseType,
  ProductVariantSizeType,
  ProductVariants,
  ProductVariant,
  VariantBaseMap,
  VariantSizeMap,
} from './@type';
import { Status } from '@app/constants';

// RESPONSE DESCRIPTION

/**
 * @swagger
 * components:
 *   schema:
 *     ProductVariant:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         productIds:
 *           type: array
 *           item:
 *              $ref: '#/components/schema/Product'
 *         status:
 *           type: string
 *           enum:
 *              - ACTIVE
 *              - IN_ACTIVE
 *         variants:
 *             type: array
 *             item:
 *                schema:
 *                    $ref: '#/components/schema/ProductVariantChildren'
 */

/**
 * @swagger
 * components:
 *   schema:
 *     ProductVariantChildren:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         types:
 *           type: object
 *         properties:
 *            sizeMap:
 *               $ref: '#/components/schema/VariantSizeMap'
 *            baseMap:
 *               type: array
 *               item:
 *                  schema:
 *                      $ref: '#/components/schema/VariantBaseMap'
 */

/**
 * @swagger
 * components:
 *   schema:
 *     VariantSizeMap:
 *       type: object
 *       properties:
 *          types:
 *             type: object
 *             properties:
 *                sizePriceVariant:
 *                  type: number
 *                size:
 *                  type: string
 *                  enum:
 *                     - SMALL
 *                     - MEDIUM
 *                     - LARGE
 *                  default: 'SMALL'
 */

/**
 * @swagger
 * components:
 *   schema:
 *     VariantBaseMap:
 *       type: object
 *       properties:
 *          typeSizes:
 *             type: object
 *             properties:
 *               basePriceVariant:
 *                   type: number
 *               base:
 *                   type: string
 *                   enum:
 *                      - PAN
 *                      - CRISPY_THIN
 *                      - EXTREME_CHEESE
 *                      - EXTREME_SAUSAGE_CHEESE
 *                   default: 'PAN'
 *
 *
 */

const ProductVariantBaseMap = new Schema<VariantBaseMap>(
  {
    base: {
      type: String,
      enum: ProductVariantBaseType,
      default: ProductVariantBaseType.PAN,
    },
    basePriceVariant: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
const ProductVariantSizeMap = new Schema<VariantSizeMap>(
  {
    sizePriceVariant: {
      type: Number,
    },
    size: {
      type: String,
      enum: ProductVariantSizeType,
      default: ProductVariantSizeType.SMALL,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const ProductVariantSchema = new Schema<ProductVariant>(
  {
    types: {
      sizeMap: ProductVariantSizeMap,
      baseMap: [ProductVariantBaseMap],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const ProductVariantsSchema = new Schema<ProductVariants>(
  {
    productIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    status: {
      type: String,
      enum: Status,
      default: Status.ACTIVE,
    },
    variants: {
      type: [ProductVariantSchema],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const ProductVariantsModel = model('ProductVariant', ProductVariantsSchema);

export default ProductVariantsModel;
export { ProductVariantsSchema };
