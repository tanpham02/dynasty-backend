import { Schema, Document } from 'mongoose';
import { BaseModel } from '@app/types';

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
 *              - INACTIVE
 *           default: "ACTIVE"
 *         types:
 *           type: array
 *           items:
 *              type: string
 *              enum:
 *                 - NORMAL
 *                 - NEW
 *                 - BEST_SELLER
 *                 - DELICIOUS_MUST_TRY
 *                 - VEGETARIAN
 *                 - SPICY
 *                 - UNIQUE
 *         attributeMapping:
 *           type: array
 *           items:
 *             type: string
 *         productAttributeList:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                extendedName:
 *                   type: string
 *                extendedValue:
 *                   type: string
 *                productAttributeItem:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                          attributeId:
 *                             type: string
 *                          priceAdjustmentValue:
 *                             type: number
 *         productsVariant:
 *           type: array
 *           items:
 *              type: string
 *         visible:
 *           type: boolean
 */

enum ProductType {
  NORMAL = 'NORMAL', // bình thường
  NEW = 'NEW', // mới
  BEST_SELLER = 'BEST_SELLER', // bán chạy
  DELICIOUS_MUST_TRY = 'DELICIOUS_MUST_TRY', // ngon phải thử
  VEGETARIAN = 'VEGETARIAN', // chay
  SPICY = 'SPICY', // cay
  UNIQUE = 'UNIQUE', // độc đáo
}

enum ProductVariantSizeType {
  SMALL = 'SMALL', // Nhỏ 6”
  MEDIUM = 'MEDIUM', // Vừa 9”
  LARGE = 'LARGE', // Lớn 12”
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
  oldPrice?: number; // Don't need to care
  image?: string;
  images?: string[];
  types?: ProductType[];
  orderQuantity?: number;
  visible?: boolean;
  attributeMapping?: [string];
  productAttributeList?: {
    extendedName?: string; // Nhỏ 6” - Dày
    extendedValue?: string; // nho_day
    productAttributeItem: Array<{
      attributeId?: Schema.Types.ObjectId;
      priceAdjustmentValue?: number; // 80000
    }>;
  }[];
  productsVariant?: Schema.Types.ObjectId[];
}

export { Product, ProductType, ProductVariantSizeType, ProductVariantBaseType };
