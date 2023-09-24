import dotenv from 'dotenv';
import 'module-alias/register';
import { MODE } from '@app/constants';

interface Config {
  port: number;
  MONGO_URL: string;
  jwtAccessKey?: string;
  jwtRefreshKey?: string;
}

const configApp = () => {
  dotenv.config({ path: '.env.development' });

  let resultConfig: Config = {
    port: process.env.PORT ? Number(process.env.PORT) : 8081,
    MONGO_URL: process.env.MONGO_URL || '',
  };

  if (process.env.NODE_ENV === MODE.PRODUCTION) {
    dotenv.config({ path: '.env.production' });
    resultConfig = {
      port: process.env.PORT ? Number(process.env.PORT) : 8081,
      MONGO_URL: process.env.MONGO_URL || '',
    };
  }
  resultConfig.jwtAccessKey = process.env.JWT_ACCESS_KEY;
  resultConfig.jwtRefreshKey = process.env.JWT_REFRESH_KEY;

  return resultConfig;
};

export default configApp;
