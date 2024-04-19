import { BaseModel } from './common.types';

export enum TemplateType {
  WELCOME_EMAIL = 'WELCOME_EMAIL',
  ORDER_CONFIRM_EMAIL = 'ORDER_CONFIRM_EMAIL',
}

export interface EmailTemplate extends BaseModel {
  subject: string;
  body: string;
  templateType?: TemplateType; // verify
}
