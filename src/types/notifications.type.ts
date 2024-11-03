import { Document } from 'mongoose';

export interface Notifications extends Document {
  reference: {
    orderId: string;
  };
}
