import { BaseModel } from '@app/types';
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
 */

interface ProductAttribute extends BaseModel, Document {
  name?: string;
}

export { ProductAttribute };
