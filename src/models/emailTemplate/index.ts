import { Schema, model } from 'mongoose';
import { EmailTemplate, TemplateType } from './@type';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schema:
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

const EmailTemplateSchema = new Schema<EmailTemplate>(
  {
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    templateType: {
      type: String,
      enum: TemplateType,
    },
  },
  { versionKey: false, timestamps: true },
);

const EmailTemplateModel = model('EmailTemplateModel', EmailTemplateSchema);

export default EmailTemplateModel;
