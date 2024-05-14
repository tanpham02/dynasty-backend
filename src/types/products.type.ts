import { Schema, Document } from 'mongoose';
import { BaseModel } from '@app/types/common.types';

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

interface ProductAttributeItem {
  extendedIds: string[];
  priceAdjustmentValue: number;
}

interface Product extends BaseModel {
  name: string;
  slug?: string;
  description?: string;
  information?: string;
  categoryId?: string;
  price: number;
  oldPrice?: number; // Don't need to care
  image?: string;
  images?: string[];
  types?: ProductType[];
  orderQuantity?: number;
  visible?: boolean;
  productAttributeList?: ProductAttributeItem[];
  productsVariant?: string[];
}

export { Product, ProductType, ProductAttributeItem };
