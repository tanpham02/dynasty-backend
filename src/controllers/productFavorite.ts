const productFavoriteController = {
  // SEARCH PAGINATION
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex, pageSize, name, sort } = req.query;
    try {
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
        name: name?.toString(),
        sort: sort?.toString(),
      };
      const banner = await bannerService.getPagination(params);
      res.status(HttpStatusCode.OK).json(banner);
    } catch (error: any) {
      next(error);
    }
  },

  // CREATE
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await bannerService.createOverriding(req, FIELDS_NAME.BANNER);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log('🚀 ~ file: banners.ts:37 ~ create: ~ error:', error);
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ids } = req.query;
      const { message } = await bannerService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};
