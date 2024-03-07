import { Document, Schema } from 'mongoose';

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
