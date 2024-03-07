import { Schema, model } from 'mongoose';
import { EmailConfig } from './@type';

const EmailConfigSchema = new Schema<EmailConfig>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
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
      required: true,
    },
    port: {
      type: Number,
      required: true,
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
