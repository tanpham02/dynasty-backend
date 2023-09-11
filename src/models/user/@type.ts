import { Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userName
 *         - password
 *       properties:
 *         userName:
 *           type: string
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
 */

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

interface User extends Document {
  userName?: string;
  birthday?: string | Date;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  password?: string;
  role?: Role;
}

export default User;
