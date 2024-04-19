import { BaseModel, LocationBaseModel } from '@app/types/common.types';

interface CustomerAddressItem extends LocationBaseModel {
  fullName?: string;
  phoneNumber?: string;
  isDefault?: boolean;
  _id?: string;
}

interface CustomerAddress extends BaseModel {
  customerId?: string;
  addressList: CustomerAddressItem[];
}

export { CustomerAddress };
