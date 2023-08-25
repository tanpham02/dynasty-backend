import { Status } from '@app/constants';
import { Schema, Document } from 'mongoose';

// SCHEMAS DESCRIPTION
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         status:
 *           type: string
 *           enum:
 *              - ACTIVE
 *              - IN_ACTIVE
 *           description: The status category
 *         productId:
 *           type: array
 *           item: string
 *         childCategory:
 *           type: array
 *           item:
 *             schema:
 *                $ref: '#/components/schema/Category'
 */

interface Category extends Document {
  _id?: Schema.Types.ObjectId;
  name: string;
  status?: Status;
  childCategory?: Category[];
  productId?: [Schema.Types.ObjectId];
}

export { Category };
