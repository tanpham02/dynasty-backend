import { LocationBaseModel } from '@app/types';
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
 *                  type: string
 *              district:
 *                  type: string
 *              districtId:
 *                  type: string
 *              ward:
 *                  type: string
 *              wardId:
 *                  type: string
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

interface CustomerAddress extends Document, LocationBaseModel {
  customerId?: Schema.Types.ObjectId;
  addressList: Array<{
    fullName?: string;
    phoneNumber?: string;
    isDefault?: boolean;
    _id?: any;
  }>;
}

export { CustomerAddress };
