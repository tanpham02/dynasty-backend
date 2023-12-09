import { Schema, Document } from 'mongoose';
import { BaseModel } from '@app/types';
import { Product } from '../product/@type';

// SCHEMAS DESCRIPTION
/**
 * @swagger
 * components:
 *   schemas:
 *     productVariant:
 *       type: object
 *       properties:
 *         parentId:
 *           type: string
 *         productItem:
 *           $ref: '#/components/schema/Product'
 *         productVariantPairs:
 *           type: array
 *           items:
 *               type: string
 */

interface ProductVariants extends BaseModel, Document {
  _id?: Schema.Types.ObjectId;
  parentId?: Schema.Types.ObjectId;
  productItem?: Product;
  productVariantPairs?: [string]; // [SMALL, PAN] => SMALL-PAN
}

export { ProductVariants };
