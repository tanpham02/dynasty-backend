import { ProductStatus } from '@app/constants';
import { CustomerType } from '@app/models/customers/@type';
import { ProductType } from '@app/models/products/@type';
import { Role } from '@app/models/users/@type';

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
}

interface BaseModel {
  status?: ProductStatus;
  slug?: string;
}

enum TypeUpload {
  ONE = 'ONE',
  MULTIPLE = 'MULTIPLE',
}

type SortOrderBy = -1 | 1;

export { Params, Filter, BaseModel, SortOrderBy, TypeUpload };
