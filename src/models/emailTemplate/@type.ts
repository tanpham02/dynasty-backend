import { Document, Schema } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     EmailTemplate:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         subject:
 *           type: string
 *         body:
 *           type: string
 *         templateType:
 *           type: string
 *           enum:
 *             - WELCOME_EMAIL
 *             - ORDER_CONFIRM_EMAIL
 */

export enum TemplateType {
  WELCOME_EMAIL = 'WELCOME_EMAIL',
  ORDER_CONFIRM_EMAIL = 'ORDER_CONFIRM_EMAIL',
}

export interface EmailTemplate extends Document {
  _id: Schema.Types.ObjectId;
  subject: string;
  body: string;
  templateType?: TemplateType; // verify
}
