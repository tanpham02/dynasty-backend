import { Status } from '@app/constants';
import { Schema, Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
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
 *   schemas:
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
 *                $ref: '#/components/schema/VariantSizeMap'
 *            baseMap:
 *               type: array
 *               item:
 *                 schema:
 *                    $ref: '#/components/schema/VariantBaseMap'
 */

/**
 * @swagger
 * components:
 *   schemas:
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
 *   schemas:
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

enum ProductVariantSizeType {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

enum ProductVariantBaseType {
  PAN = 'PAN',
  CRISPY_THIN = 'CRISPY_THIN',
  EXTREME_CHEESE = 'EXTREME_CHEESE',
  EXTREME_SAUSAGE_CHEESE = 'EXTREME_SAUSAGE_CHEESE',
}

interface VariantBaseMap extends Document {
  base?: ProductVariantBaseType;
  basePriceVariant?: number;
}
interface VariantSizeMap extends Document {
  size?: ProductVariantSizeType;
  sizePriceVariant?: number;
}

interface ProductVariant extends Document {
  types?: {
    sizeMap?: VariantSizeMap[];
    baseMap?: VariantBaseMap[];
  };
}

interface ProductVariants extends Document {
  _id?: Schema.Types.ObjectId;
  productIds?: Schema.Types.ObjectId[];
  variants: ProductVariant[];
  status?: Status;
}

export {
  ProductVariants,
  ProductVariantBaseType,
  ProductVariantSizeType,
  VariantBaseMap,
  VariantSizeMap,
  ProductVariant,
};
