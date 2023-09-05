import { ProductType } from '@app/models/product/@type';

interface Params {
  pageIndex: number;
  pageSize: number;
  name?: string | any;
  categoryId?: string;
  cityId?: number;
  districtId?: number;
  wardId?: number;
  types?: ProductType;
}

interface Filter {
  name?: string | any;
  categoryId?: string | any;
  cityId?: number;
  districtId?: number;
  wardId?: number;
  types?: ProductType | any;
}

export { Params, Filter };
