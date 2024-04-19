/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpStatusCode } from '@app/types';
import CategoryService from '@app/services/category.service';
import { Params } from '@app/types/common.types';
import { NextFunction, Request, Response } from 'express';
import { CategoryModel } from '@app/models';

const categoryService = new CategoryService(CategoryModel, 'category');

const categoryController = {
  // SEARCH ALL
  searchAll: async (__req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await categoryService.findAll();
      res.status(HttpStatusCode.OK).json(category);
    } catch (error) {
      next(error);
    }
  },

  // SEARCH PAGINATION CATEGORY
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex, pageSize, name, sort, isShowHomePage } = req.query;
    const params: Params = {
      pageIndex: pageIndex ? parseInt(pageIndex.toString()) : 0,
      pageSize: pageSize ? parseInt(pageSize.toString()) : 10,
      name: name?.toString(),
      sort: sort?.toString(),
      isShowHomePage: Number(isShowHomePage),
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
      const response = await categoryService.updateOverriding(id, req);
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
};

export default categoryController;
