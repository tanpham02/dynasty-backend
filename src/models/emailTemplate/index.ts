import { Schema, model } from 'mongoose';
import { EmailTemplate, TemplateType } from './@type';

const EmailConfigSchema = new Schema<EmailTemplate>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },

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

const EmailConfigModel = model('EmailConfigModel', EmailConfigSchema);

export default EmailConfigModel;
