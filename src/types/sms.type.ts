import { BaseModel } from '@app/types/common.types';
import { Document } from 'mongoose';

export enum SMSType {
  SEND = 'SEND',
  RESEND = 'RESEND',
}

export interface SMS extends Document {
  type: SMSType;
  phoneNumber: string;
}
