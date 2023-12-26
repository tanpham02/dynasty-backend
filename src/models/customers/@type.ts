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
 *             description: Ref to them document Customer Address
 *         orderIds:
 *             type: array
 *             items:
 *                type: string
 *         status:
 *          type: string
 *          default: "ACTIVE"
 *          enum:
 *             - ACTIVE
 *             - INACTIVE
 *         customerType:
 *          type: string
 *          default: "NEW"
 *          enum:
 *            - NEW
 *            - EXIST
 *            - POTENTIAL
 *            - BUY_THE_MOST_ORDERS
 */

enum CustomerType {
  NEW = 'NEW',
  EXIST = 'EXIST',
  POTENTIAL = 'POTENTIAL',
  BUY_THE_MOST_ORDERS = 'BUY_THE_MOST_ORDERS',
}
interface Customer extends BaseModel, Document {
  phoneNumber?: string;
  fullName?: string;
  email?: string;
  password?: string;
  birthday?: string | Date;
  customerAddressId: Schema.Types.ObjectId;
  orderIds: string[];
  customerType: CustomerType;
}

export { Customer, CustomerType };
