import { Document, Schema } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerAddressList:
 *       type: object
 *       properties:
 *         city:
 *             type: string
 *         district:
 *             type: string
 *         ward:
 *             type: string
 *         address:
 *             type: string
 *         phoneNumber:
 *             type: string
 *         isDefault:
 *             type: boolean
 *             default: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerAddress:
 *       type: object
 *       properties:
 *         customerId:
 *            type: string
 *         addressList:
 *          type: array
 *          item:
 *             schema:
 *                $ref: '#/components/schema/CustomerAddressList'
 */

interface CustomerAddressList extends Document {
  city?: string;
  cityId?: number;
  district?: string;
  districtId?: number;
  ward?: string;
  wardId?: number;
  fullName?: string;
  address?: string;
  phoneNumber?: string;
  isDefault?: boolean;
}

interface CustomerAddress extends Document {
  customerId?: Schema.Types.ObjectId;
  addressList: CustomerAddressList[];
}

export { CustomerAddress, CustomerAddressList };
