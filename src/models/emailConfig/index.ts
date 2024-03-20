import { Schema, model } from 'mongoose';
import { EmailConfig } from './@type';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schema:
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

const EmailConfigSchema = new Schema<EmailConfig>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mailServer: {
      type: String,
    },
    port: {
      type: Number,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const EmailConfigModel = model('EmailConfigModel', EmailConfigSchema);

export default EmailConfigModel;
