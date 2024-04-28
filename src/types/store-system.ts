import { BaseModel, LocationBaseModel } from './common.types';

interface StoreSystem extends LocationBaseModel, BaseModel {
  name?: string;
  phoneNumber?: string;
}

export { StoreSystem };
