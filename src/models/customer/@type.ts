import { Status } from '@app/constants';
import { Document, Schema } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
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
 *             item: string
 *         status:
 *          type: string
 *          default: "ACTIVE"
 *          enum:
 *             - ACTIVE
 *             - IN_ACTIVE
 */

interface Customer extends Document {
  phoneNumber?: string;
  fullName?: string;
  email?: string;
  password?: string;
  birthday?: string | Date;
  customerAddressId: Schema.Types.ObjectId;
  orderIds: Schema.Types.ObjectId[];
  status: Status;
}

export { Customer };
