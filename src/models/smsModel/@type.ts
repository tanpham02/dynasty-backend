export enum SMSType {
  SEND = 'SEND',
  RESEND = 'RESEND',
}

export interface SMSModel {
  type: SMSType;
}
