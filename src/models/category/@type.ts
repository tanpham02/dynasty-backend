import { ProductStatusI } from '@app/types';
import { Schema, Document } from 'mongoose';

// SCHEMAS DESCRIPTION
/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *        status:
 *          type: string
 *          default: "ACTIVE"
 *          enum:
 *             - ACTIVE
 *             - IN_ACTIVE
 *        products:
 *          type: array
 *          items:
 *            type: string
 *
 *        childrenCategory:
 *          type: array
 *          items:
 *             type: object
 *             properties:
 *                parentId:
 *                   type: string
 *                category:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schema/Category'
 *
 *        priority:
 *          type: number
 *        visible:
 *          type: boolean
 */

interface Category extends ProductStatusI, Document {
  _id?: Schema.Types.ObjectId;
  name: string;
  childrenCategory?: ChildCategory[];
  products?: Schema.Types.ObjectId[];
  priority?: number;
  visible?: boolean;
}

interface ChildCategory extends Document {
  parentId?: Schema.Types.ObjectId;
  category?: Category[];
}
export { Category, ChildCategory };
