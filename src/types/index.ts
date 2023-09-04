interface Params {
  pageIndex: number;
  pageSize: number;
  name?: string | any;
  categoryId?: string;
}

interface Filter {
  name?: string | any;
  categoryId?: string | any;
}

export { Params, Filter };
