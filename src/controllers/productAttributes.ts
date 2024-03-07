/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FIELDS_NAME } from '@app/constants';
import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';
import ProductAttributeModel from '@app/models/productAttributes';
import ProductAttriButeService from '@app/services/productAttributes';
import { Params } from '@app/types';
import { NextFunction, Request, Response } from 'express';

const productAttributeService = new ProductAttriButeService(
  ProductAttributeModel,
  'product attribute',
);

const productAttributeController = {
  // SEARCH ALL
  searchAll: async (__req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productAttributeService.findAll();
      res.status(HttpStatusCode.OK).json(result);
    } catch (error: any) {
      next(error);
    }
  },

  // CREATE
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productAttributeService.create(req, FIELDS_NAME.PRODUCT_ATTRIBUTE);
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
      const { message } = await productAttributeService.update(
        id,
        req,
        FIELDS_NAME.PRODUCT_ATTRIBUTE,
      );
      res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
      next(error);
    }
  },

  // GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await productAttributeService.getById(id);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ids } = req.query;
      const { message } = await productAttributeService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};
export { productAttributeController };
