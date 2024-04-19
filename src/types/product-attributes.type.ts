import { BaseModel } from '@app/types/common.types';
import { Document } from 'mongoose';

// SCHEMAS RESPONSE
/**
 * @swagger
 * components:
 *   schemas:
 *     ProductAttribute:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         attributeList:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  name:
 *                     type: string
 *                  value:
 *                     type: string
 */

interface ProductAttribute extends BaseModel, Document {
  name?: string;
  attributeList?: Array<{
    name?: string;
    value?: string;
  }>;
}

export { ProductAttribute };
