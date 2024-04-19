import { BaseModel } from '@app/types';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - username
 *         - phoneNumber
 *         - password
 *         - email
 *       properties:
 *         birthday:
 *           type: string
 *           description: VD 2023-09-09
 *         username:
 *             type: string
 *         fullName:
 *             type: string
 *         image:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         location:
 *           type: string
 *         city:
 *           type: string
 *         cityId:
 *           type: string
 *         district:
 *           type: string
 *         districtId:
 *           type: string
 *         ward:
 *           type: string
 *         wardId:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [ADMIN, USER]
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 */

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SHIPPER = 'SHIPPER',
}

interface Staff extends BaseModel {
  username?: string;
  birthday?: string | Date;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  location?: string;
  city: string;
  cityId: number;
  district: string;
  districtId: number;
  ward: string;
  wardId: number;
  password?: string;
  role?: Role;
  image?: string;
}

export { Staff };
