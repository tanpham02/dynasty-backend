import { Schema } from 'mongoose';

import { SMS, SMSType } from '../types/sms.type';

const SMSSchema = new Schema<SMS>(
  {
    type: {
      type: String,
      enum: SMSType,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default SMSSchema;
