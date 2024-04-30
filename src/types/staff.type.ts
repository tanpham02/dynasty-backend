import { BaseModel, LocationBaseModel } from '@app/types';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SHIPPER = 'SHIPPER',
}

interface Staff extends LocationBaseModel, BaseModel {
  username?: string;
  birthday?: string | Date;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  role?: Role;
  image?: string;
}

export { Staff };
