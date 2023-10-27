import { Document, Schema } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerAddressItem:
 *       type: object
 *       properties:
 *         city:
 *             type: string
 *         cityId:
 *             type: number
 *         district:
 *             type: string
 *         districtId:
 *             type: number
 *         ward:
 *             type: string
 *         wardId:
 *             type: number
 *         address:
 *             type: string
 *         fullName:
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
 *     CustomerAddressList:
 *       type: object
 *       properties:
 *         customerId:
 *            type: string
 *         addressList:
 *          type: array
 *          items:
 *             schema:
 *                $ref: '#/components/schema/CustomerAddressItem'
 */

interface CustomerAddressItem extends Document {
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

interface CustomerAddressList extends Document {
  customerId?: Schema.Types.ObjectId;
  addressList: CustomerAddressItem[];
}

export { CustomerAddressItem, CustomerAddressList };
