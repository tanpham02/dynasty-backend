import { BaseModel } from '@app/types';
import { Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - phoneNumber
 *         - password
 *         - email
 *       properties:
 *         birthday:
 *           type: string
 *           description: VD 2023-09-09
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
 *           enum: [ACTIVE, IN_ACTIVE]
 */

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

interface User extends BaseModel, Document {
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

export default User;
