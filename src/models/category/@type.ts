import { Status } from '@app/constants';
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
 *          default: ""
 *        status:
 *          type: string
 *          default: ""
 *          enum:
 *             - ACTIVE
 *             - IN_ACTIVE
 *        productsDTO:
 *          type: array
 *          item:
 *             $ref: '#/components/schema/Product'
 *
 *        childCategory:
 *          type: array
 *          item:
 *             $ref: '#/components/schema/Category'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ChildrenCategory:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *        parentId:
 *          type: string
 *          item:
 *             $ref: '#/components/schema/Category'
 *
 *        childCategory:
 *          type: array
 *          item:
 *             $ref: '#/components/schema/ChildrenCategory'
 */

interface Category extends Document {
  _id?: Schema.Types.ObjectId;
  name: string;
  status?: Status;
  childCategory?: ChildCategory[] | any;
  productsDTO?: Schema.Types.ObjectId[];
}

interface ChildCategory extends Document {
  parentId?: Schema.Types.ObjectId;
  children?: Category;
}
export { Category, ChildCategory };
