import { BaseModel } from './common.types';

interface Banner extends BaseModel {
  name?: string;
  priority?: number;
  url?: string;

  [key: string]: any;
}

export { Banner };
