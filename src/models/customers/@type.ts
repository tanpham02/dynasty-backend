import { BaseModel } from '@app/types';
import { Document, Schema } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     Customers:
 *       type: object
 *       properties:
 *         phoneNumber:
 *             type: string
 *         fullName:
 *             type: string
 *         email:
 *             type: string
 *         password:
 *             type: string
 *         birthday:
 *             type: string
 *             description: 2023-05-25
 *         customerAddressId:
 *             type: string
 *         orderIds:
 *             type: array
 *             items:
 *                type: string
 *         status:
 *          type: string
 *          default: "ACTIVE"
 *          enum:
 *             - ACTIVE
 *             - IN_ACTIVE
 */

interface Customer extends BaseModel, Document {
  phoneNumber?: string;
  fullName?: string;
  email?: string;
  password?: string;
  birthday?: string | Date;
  customerAddressId: Schema.Types.ObjectId;
  orderIds: string[];
}

export { Customer };
