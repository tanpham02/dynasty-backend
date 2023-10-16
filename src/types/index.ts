import { ProductType } from '@app/models/product/@type';
import { Role } from '@app/models/user/@type';

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
}

interface Filter {
  name?: string | any;
  categoryId?: string | any;
  cityId?: number;
  districtId?: number;
  wardId?: number;
  types?: ProductType | any;
  comboPromotionsId?: string;
  productIds?: string;
  fullName?: string | any;
  role?: Role | string;
}

export { Params, Filter };
