/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import dotenv from 'dotenv';
import 'module-alias/register';

import { MODE } from '@app/types';

interface Config {
  PORT: number;
  MONGO_URL: string;
  STAFF_JWT_ACCESS_KEY: string;
  STAFF_JWT_REFRESH_KEY: string;
  CUSTOMER_JWT_ACCESS_KEY: string;
  CUSTOMER_JWT_REFRESH_KEY: string;
  APP_URL: string;
  FRONT_END_URL: string;
  MAIL_USERNAME: string;
  MAIL_APPLICATION_PASSWORD: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  REDIRECT_URL: string;
  INFO_BIP_API_KEY: string;
  INFO_BIP_HOST: string;
  SWAGGER_ENDPOINT: string;
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_PHONE_NUMBER: string;
}

const configApp = () => {
  switch (process.env.NODE_ENV) {
    case MODE.DEVELOPMENT:
      dotenv.config({ path: '.env.development' });
      break;
    case MODE.STAGING:
      dotenv.config({ path: '.env.staging' });
      break;
    case MODE.PRODUCTION:
      dotenv.config({ path: '.env.production' });
      break;
    default:
      break;
  }

  const port = process.env.PORT ? Number(process.env.PORT) : 8081;

  const resultConfig: Config = {
    PORT: port,
    MONGO_URL: process.env.MONGO_URL || '',
    APP_URL: process.env.BASE_URL || '',
    STAFF_JWT_ACCESS_KEY: process.env.STAFF_JWT_ACCESS_KEY || '',
    STAFF_JWT_REFRESH_KEY: process.env.STAFF_JWT_REFRESH_KEY || '',
    CUSTOMER_JWT_ACCESS_KEY: process.env.CUSTOMER_JWT_ACCESS_KEY || '',
    CUSTOMER_JWT_REFRESH_KEY: process.env.CUSTOMER_JWT_REFRESH_KEY || '',
    FRONT_END_URL: process.env.FRONTEND_URL || '',
    MAIL_APPLICATION_PASSWORD: process.env.MAIL_APPLICATION_PASSWORD || '',
    MAIL_USERNAME: process.env.MAIL_USERNAME || '',
    CLIENT_ID: process.env.CLIENT_ID || '',
    CLIENT_SECRET: process.env.CLIENT_SECRET || '',
    REDIRECT_URL: process.env.REDIRECT_URL || '',
    INFO_BIP_API_KEY: process.env.INFOBIP_API_KEY || '',
    INFO_BIP_HOST: process.env.INFOBIP_HOST || '',
    SWAGGER_ENDPOINT: process.env.SWAGGER_ENDPOINT || '',
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || '',
  };

  return resultConfig;
};

export default configApp;
