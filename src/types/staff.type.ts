import { BaseModel } from '@app/types';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SHIPPER = 'SHIPPER',
}

interface Staff extends BaseModel {
  username?: string;
  birthday?: string | Date;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  location?: string;
  city: string;
  cityId: number;
  district: string;
  districtId: number;
  ward: string;
  wardId: number;
  password?: string;
  role?: Role;
  image?: string;
}

export { Staff };
