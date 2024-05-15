/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { ProductModel } from '@app/models';
import { ProductService } from '@app/services';
import { HttpStatusCode, Params, ProductType } from '@app/types';

const productService = new ProductService(ProductModel, 'product');

const productController = {
  //SEARCH PAGINATION PRODUCT
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex = 0, pageSize = 10, name, categoryId, types, sortBy } = req.query;
    try {
      const params: Params = {
        name: name?.toString(),
        categoryId: categoryId?.toString(),
        types: types as ProductType,
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize),
        sortBy: sortBy?.toString(),
      };
      const product = await productService.getPagination(params);
      res.status(HttpStatusCode.OK).json(product);
    } catch (error) {
      next(error);
    }
  },

  //CREATE PRODUCT
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.createProduct(req);
      res.status(HttpStatusCode.OK).json(product);
    } catch (error) {
      next(error);
    }
  },

  //UPDATE PRODUCT
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await productService.updateProduct(id, req);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  //GET PRODUCT BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const product = await productService.getByIdProduct(id);
      res.status(HttpStatusCode.OK).json(product);
    } catch (error) {
      next(error);
    }
  },

  // DELETE PRODUCT
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      const { message } = await productService.deleteProduct(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default productController;
