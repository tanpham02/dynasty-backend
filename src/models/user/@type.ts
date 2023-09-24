import { Status } from '@app/constants';
import { Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
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
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         address:
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

interface User extends Document {
  birthday?: string | Date;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  city: string;
  cityId: number;
  district: string;
  districtId: number;
  ward: string;
  wardId: number;
  password?: string;
  role?: Role;
  status: Status;
}

export default User;
