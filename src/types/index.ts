import { ProductStatus } from '@app/constants';
import { ProductType } from '@app/models/product/@type';
import { Role } from '@app/models/user/@type';
import { SortOrder } from 'mongoose';

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
}

interface BaseModel {
  status?: ProductStatus;
  slug?: string;
}

type SortOrderBy = -1 | 1 | 'asc' | 'ascending' | 'desc' | 'descending';

export { Params, Filter, BaseModel, SortOrderBy };
