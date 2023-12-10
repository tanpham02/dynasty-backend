import { Schema, Document } from 'mongoose';
import { BaseModel } from '@app/types';
import { Product } from '../product/@type';

// SCHEMAS DESCRIPTION
/**
 * @swagger
 * components:
 *   schemas:
 *     ProductVariant:
 *       type: object
 *       properties:
 *         parentId:
 *           type: string
 *         productItem:
 *           $ref: '#/components/schema/Product'
 */

interface ProductVariants extends BaseModel, Document {
  _id?: Schema.Types.ObjectId;
  parentId?: Schema.Types.ObjectId;
  productItem?: Product;
}

export { ProductVariants };
