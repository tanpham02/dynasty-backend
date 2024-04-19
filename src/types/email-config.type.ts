import { BaseModel } from './common.types';

export interface EmailConfig extends BaseModel {
  username: string;
  password: string;
  mailServer: string;
  port: number;
  isDefault: boolean;
}
