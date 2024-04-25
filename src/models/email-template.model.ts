import { Schema, model } from 'mongoose';
import { EmailTemplate, TemplateType } from '../types/email-template.type';

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
