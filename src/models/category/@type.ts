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

interface Category extends Document {
  _id?: Schema.Types.ObjectId;
  name: string;
  status?: Status;
  childCategory?: Category[];
  productsDTO?: Schema.Types.ObjectId[];
}

export { Category };
