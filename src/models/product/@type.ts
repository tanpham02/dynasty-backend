import { Schema, Document } from 'mongoose';
import { BaseModel } from '@app/types';
import { ProductAttribute } from '../productAttribute/@type';

// SCHEMAS DESCRIPTION
/**
 * @swagger
 * components:
 *   schemas:
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

enum ProductType {
  NORMAL = 'NORMAL', // bình thường
  NEW = 'NEW', // mới
  BEST_SELLER = 'BEST_SELLER', // bán chạy
  DELICIOUS_MUST_TRY = 'DELICIOUS_MUST_TRY', // ngon phải thử
  VEGETARIAN = 'VEGETARIAN', // chay
  SPICY = 'SPICY', // cay
  UNIQUE = 'UNIQUE', // dộc đáo
}

enum ProductVariantSizeType {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

enum ProductVariantBaseType {
  PAN = 'PAN', // Dày
  CRISPY_THIN = 'CRISPY_THIN', // Mỏng giòn
  EXTREME_CHEESE = 'EXTREME_CHEESE', // Viền pho mai
  EXTREME_SAUSAGE_CHEESE = 'EXTREME_SAUSAGE_CHEESE', // Viền pho mai xúc xích
}

interface Product extends BaseModel, Document {
  _id?: Schema.Types.ObjectId;
  name: string;
  description?: string;
  information?: string;
  categoryId?: Schema.Types.ObjectId;
  price: number;
  oldPrice?: number; // No need to care
  image?: string;
  images?: string[];
  types?: ProductType[];
  orderQuantity?: number;
  visible?: boolean;
  attribute?: Schema.Types.ObjectId[];
  productAttributeList?: Array<{
    attributeId?: Schema.Types.ObjectId;
    name?: string;
    value?: string;
    priceAdjustment?: string; // + 80,000
    priceAdjustmentValue?: number; // 80000
  }>;
  productsVariant?: Schema.Types.ObjectId[];
}

export { Product, ProductType, ProductVariantSizeType, ProductVariantBaseType };
