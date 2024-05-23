/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ProductAttributeModel } from '@app/models';
import { ProductAttributeService } from '@app/services';
import { HttpStatusCode } from '@app/types';
import { NextFunction, Request, Response } from 'express';

const productAttributeService = new ProductAttributeService(
  ProductAttributeModel,
  'product attribute',
);

const productAttributeController = {
  // SEARCH ALL
  searchAll: async (req: Request, res: Response, next: NextFunction) => {
    const searchQuery = { ...req.query };
    try {
      const result = await productAttributeService.findAll(searchQuery);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error: any) {
      next(error);
    }
  },

  // CREATE
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productAttributeService.create(req);
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
      const response = await productAttributeService.updatePutMethod(req, id);
      res.status(HttpStatusCode.OK).json(response);
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
export default productAttributeController;
