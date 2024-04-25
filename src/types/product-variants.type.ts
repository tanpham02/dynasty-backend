import { BaseModel } from '@app/types/common.types';
import { Product } from './products.type';

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
 *           $ref: '#/components/schema/Products'
 */

interface ProductVariants extends BaseModel {
  parentId?: string;
  productItem?: Product;
}

export { ProductVariants };
