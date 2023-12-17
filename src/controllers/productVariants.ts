/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FIELDS_NAME } from '@app/constants';
import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';
import { ProductType } from '@app/models/products/@type';
import ProductVariantModel from '@app/models/productVariants';
import ProductVariantService from '@app/services/productVariants';
import { Params } from '@app/types';
import { NextFunction, Request, Response } from 'express';

const productVariantService = new ProductVariantService(ProductVariantModel, 'product variant');

const productVariantController = {
  //SEARCH PAGINATION
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex, pageSize, name, categoryId, types, parentId } = req.query;
    try {
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
        name: name?.toString(),
        categoryId: categoryId?.toString(),
        types: types as ProductType,
        parentId: parentId?.toString(),
      };
      const product = await productVariantService.getPagination(params);
      res.status(HttpStatusCode.OK).json(product);
    } catch (error) {
      next(error);
    }
  },

  // CREATE
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productVariantService.create(req, FIELDS_NAME.PRODUCT_VARIANT);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      console.log('🚀 ~ file: productAttribute.ts:36 ~ create: ~ error:', error);
      next(error);
    }
  },

  // UPDATE
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { message } = await productVariantService.updateOverriding(
        id,
        req,
        FIELDS_NAME.PRODUCT_VARIANT,
      );
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },

  // GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await productVariantService.getById(id);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ids } = req.query;
      const { message } = await productVariantService.deleteOverriding(ids as string[]);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export { productVariantController };
