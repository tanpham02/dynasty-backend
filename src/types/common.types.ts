import { Document } from 'mongoose';

import { CustomerType } from '@app/types/customers.type';
import { ProductType } from '@app/types/products.type';
import { Role } from '@app/types/staff.type';


type Callback = () => void

enum MODE {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  STAGING = 'staging',
}

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  INCOMING = 'INCOMING',
}

interface Params {
  pageIndex?: number;
  pageSize?: number;
  name?: string;
  categoryId?: string;
  cityId?: number;
  districtId?: number;
  wardId?: number;
  types?: ProductType;
  comboPromotionsId?: string;
  productId?: string;
  fullName?: string;
  sortByField?: string;
  from?: Date | string;
  to?: Date | string;
  role?: Role | string;
  customerId?: string;
  statusOrder?: string;
  sortBy?: string;
  parentId?: string;
  customerType?: CustomerType | string;
  isDefault?: string;
  [key: string]: any;
}

interface Filter {
  name?: string | any;
  customerId?: string;
  categoryId?: string | any;
  cityId?: number;
  districtId?: number;
  wardId?: number;
  types?: ProductType | any;
  comboPromotionsId?: string;
  productIds?: string;
  fullName?: string | any;
  role?: Role | string;
  createdAt?: any;
  statusOrder?: string;
  importDate?: any;
  sort?: string;
  parentId?: string;
  customerType?: CustomerType | string;
  isShowHomePage?: boolean;
  isDefault?: boolean;
  [key: string]: any;
}

interface BaseModel extends Document {
  status?: Status;
  _id?: string;
}

interface LocationBaseModel {
  location?: string;
  city?: string;
  cityId?: string;
  district?: string;
  districtId?: string;
  ward?: string;
  wardId?: string;
  latitude?: string;
  longitude?: string;
}

enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  CONFLICT = 409,
  UN_AUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER = 500,
}

type SortOrderBy = -1 | 1;

export { BaseModel, Filter, HttpStatusCode, LocationBaseModel, MODE, Params, SortOrderBy, Status, Callback };
