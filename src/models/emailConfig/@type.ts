import { Document, Schema } from 'mongoose';

export interface EmailConfig extends Document {
  _id: Schema.Types.ObjectId;
  username: string;
  password: string;
  mailServer: string; // SMTP
  port: number; // 587
  isDefault: boolean; // default: false
}
