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
 *         productVariantId:
 *           type: string
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

export enum ProductVariantSizeType {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum ProductVariantBaseType {
  PAN = 'PAN',
  CRISPY_THIN = 'CRISPY_THIN',
  EXTREME_CHEESE = 'EXTREME_CHEESE',
  EXTREME_SAUSAGE_CHEESE = 'EXTREME_SAUSAGE_CHEESE',
}

interface ProductAttribute {
  attributeName?: string; // Tên thuộc tính
  attributeList?: Array<{
    // Danh sách các thuộc tính
    name?: string;
    value?: string; // It's can any type
    priceAdjustment?: string;
    priceAdjustmentValue?: number;
  }>;
  productVariantList: Product[]; // Danh sách sản phẩm con
}

interface Product extends BaseModel, Document {
  _id?: Schema.Types.ObjectId;
  name: string;
  description?: string;
  information?: String;
  categoryId?: Schema.Types.ObjectId;
  price: number;
  oldPrice?: number; // No need to care
  image?: string;
  images?: string[];
  types?: ProductType[];
  orderQuantity?: number;
  visible?: boolean;
  attribute?: ProductAttribute[];
}

export { Product, ProductType };
