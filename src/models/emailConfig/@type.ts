import { Document, Schema } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     EmailConfig:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         mailServer:
 *           type: string
 *         port:
 *           type: number
 *         isDefault:
 *           type: boolean
 */

export interface EmailConfig extends Document {
  _id: Schema.Types.ObjectId;
  username: string;
  password: string;
  mailServer: string; // SMTP
  port: number; // 587
  isDefault: boolean; // default: false
}
