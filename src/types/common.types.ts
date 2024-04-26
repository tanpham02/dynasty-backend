import { Document } from 'mongoose';

import { CustomerType } from '@app/types/customers.type';
import { ProductType } from '@app/types/products.type';
import { Role } from '@app/types/staff.type';

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
  pageIndex: number;
  pageSize: number;
  name?: string | any;
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
  sort?: string;
  parentId?: string;
  customerType?: CustomerType | string;
  isShowHomePage?: number;
  isDefault?: string;
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
}

interface BaseModel extends Document {
  status?: Status;
  _id?: string;
}

interface LocationBaseModel {
  location?: string;
  cityId?: string;
  city?: string;
  districtId?: string;
  district?: string;
  wardId?: string;
  ward?: string;
  latitude?: string;
  longitude?: string;
}

enum TypeUpload {
  ONE = 'ONE',
  MULTIPLE = 'MULTIPLE',
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

export {
  BaseModel,
  Filter,
  LocationBaseModel,
  MODE,
  Params,
  SortOrderBy,
  Status,
  TypeUpload,
  HttpStatusCode,
};
