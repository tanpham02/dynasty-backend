interface Params {
  pageIndex: number;
  pageSize: number;
  name?: string | any;
  categoryId?: string;
  address?: string | any;
}

interface Filter {
  name?: string | any;
  categoryId?: string | any;
  address?: string | any;
}

export { Params, Filter };
