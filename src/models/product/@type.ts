import { Status } from '@app/constants';
import { Schema, Document } from 'mongoose';
import { ProductVariants } from '../productVariant/@type';

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

interface Product extends Document {
  _id?: Schema.Types.ObjectId;
  name: string;
  description?: string;
  information?: String;
  categoryId?: Schema.Types.ObjectId;
  price: number;
  oldPrice?: number;
  importPrice?: number;
  image?: string;
  status?: Status;
  types?: ProductType[];
  orderQuantity?: number;
  productVariantId?: Schema.Types.ObjectId;
}

export { Product, ProductType };
