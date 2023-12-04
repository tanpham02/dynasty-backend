import { FIELDS_NAME } from '@app/constants';
import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';
import CategoryModel from '@app/models/category';
import CategoryService from '@app/services/category';
import { Params } from '@app/types';
import { NextFunction, Request, Response } from 'express';

const categoryService = new CategoryService(CategoryModel, 'category');

const categoryController = {
  // SEARCH PAGINATION CATEGORY
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex, pageSize, name, comboPromotionsId } = req.query;
    const params: Params = {
      pageIndex: pageIndex ? parseInt(pageIndex.toString()) : 0,
      pageSize: pageSize ? parseInt(pageSize.toString()) : 10,
      name: name?.toString(),
      comboPromotionsId: comboPromotionsId?.toString(),
    };

    try {
      const category = await categoryService.getPagination(params);
      res.status(HttpStatusCode.OK).json(category);
    } catch (error) {
      next(error);
    }
  },

  // CREATE CATEGORY
  createCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await categoryService.createOverriding(req);
      res.status(HttpStatusCode.OK).json(category);
    } catch (error) {
      next(error);
    }
  },

  // UPDATE CATEGORY
  updateCategory: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await categoryService.update(id, req, FIELDS_NAME.CATEGORY);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // GET BY ID CATEGORY
  getCategoryById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const category = await categoryService.getCategoryById(id);
      res.status(HttpStatusCode.OK).json(category);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      next(error);
    }
  },

  // DELETE CATEGORY
  deleteCategory: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      const { message } = await categoryService.deleteOverriding(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },

  // SEARCH PAGINATION TO SHOW (UI)
  searchPaginationShowClient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pageIndex, pageSize } = req.query;
      const response = await categoryService.searchPaginationToShowProduct(
        pageIndex ? Number(pageIndex) : 0,
        pageSize ? Number(pageSize) : 4,
      );

      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },
};

export default categoryController;
