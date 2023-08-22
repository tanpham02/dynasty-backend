import { Status } from '@app/constants';
import { Schema, Document } from 'mongoose';

interface Customer extends Document {
  _id?: Schema.Types.ObjectId;
  phoneNumber?: string;
  fullName?: string;
  email?: string;
  password?: string;
  status: Status;
  birthday?: string | Date;
  city?: string;
  cityId?: number;
  district?: string;
  districtId?: number;
  ward?: string;
  wardId?: number;
  address?: string;
}

export { Customer };
