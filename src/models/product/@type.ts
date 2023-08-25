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
 *         productVariant:
 *           type: string
 */

enum ProductType {
  NORMAL = 'NORMAL',
  NEW = 'NEW',
  BEST_SELLER = 'BEST_SELLER',
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
  types?: ProductType;
  orderQuantity?: number;
  productVariant?: Schema.Types.ObjectId;
}

export { Product, ProductType };
