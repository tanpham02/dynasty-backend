/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpStatusCode } from '@app/types';
import { ProductModel } from '@app/models';
import { ProductType } from '@app/types/products.type';
import ProductService from '@app/services/products.service';
import { Params } from '@app/types/common.types';
import { NextFunction, Request, Response } from 'express';

const productService = new ProductService(ProductModel, 'product');

const productController = {
  //SEARCH PAGINATION PRODUCT
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex, pageSize, name, categoryId, types } = req.query;
    try {
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
        name: name?.toString(),
        categoryId: categoryId?.toString(),
        types: types as ProductType,
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
      const product = await productService.createOverriding(req);
      res.status(HttpStatusCode.OK).json(product);
    } catch (error) {
      next(error);
    }
  },

  //UPDATE PRODUCT
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { message } = await productService.updateOverriding(id, req);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },

  //GET PRODUCT BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const product = await productService.getByIdOverriding(id);
      res.status(HttpStatusCode.OK).json(product);
    } catch (error) {
      next(error);
    }
  },

  // DELETE PRODUCT
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      const { message } = await productService.deleteOverriding(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default productController;
