import { BaseModel } from '@app/types';
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
 *             - INACTIVE
 *        products:
 *          type: array
 *          items:
 *            type: string
 *
 *        childrenCategory:
 *          type: object
 *          properties:
 *              parentId:
 *                type: string
 *              category:
 *                type: array
 *                items:
 *                   $ref: '#/components/schema/Category'
 *
 *        slug:
 *          type: string
 *        priority:
 *          type: number
 *        visible:
 *          type: boolean
 *        isShowHomePage:
 *          type: boolean
 *          default: true
 */

interface Category extends BaseModel, Document {
  _id?: Schema.Types.ObjectId;
  name: string;
  childrenCategory?: ChildCategory;
  products?: Schema.Types.ObjectId[];
  priority?: number;
  visible?: boolean;
  isShowHomePage?: boolean;
  avatar?: string;
}

interface ChildCategory extends Document {
  parentId?: Schema.Types.ObjectId;
  category?: Category[];
}
export { Category, ChildCategory };
