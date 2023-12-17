import { Document, Schema } from 'mongoose';

// SCHEMAS DESCRIPTION

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
 *          items:
 *            type: object
 *            properties:
 *              city:
 *                  type: string
 *              cityId:
 *                  type: number
 *              district:
 *                  type: string
 *              districtId:
 *                  type: number
 *              ward:
 *                  type: string
 *              wardId:
 *                  type: number
 *              location:
 *                  type: string
 *              fullName:
 *                  type: string
 *              phoneNumber:
 *                  type: string
 *              isDefault:
 *                  type: boolean
 *                  default: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerAddressDTO:
 *       type: object
 *       properties:
 *         customerId:
 *            type: string
 *         addressItem:
 *            type: object
 *            properties:
 *              city:
 *                  type: string
 *              cityId:
 *                  type: number
 *              district:
 *                  type: string
 *              districtId:
 *                  type: number
 *              ward:
 *                  type: string
 *              wardId:
 *                  type: number
 *              location:
 *                  type: string
 *              fullName:
 *                  type: string
 *              phoneNumber:
 *                  type: string
 *              isDefault:
 *                  type: boolean
 *                  default: false

 */

interface CustomerAddress extends Document {
  customerId?: Schema.Types.ObjectId;
  addressList: Array<{
    city?: string;
    cityId?: number;
    district?: string;
    districtId?: number;
    ward?: string;
    wardId?: number;
    location?: string;
    fullName?: string;
    phoneNumber?: string;
    isDefault?: boolean;
  }>;
}

export { CustomerAddress };
