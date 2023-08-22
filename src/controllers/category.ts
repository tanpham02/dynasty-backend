import CategoryModel from '@app/models/category';
import CategoryService from '@app/services/category';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const categoryService = new CategoryService(CategoryModel, 'category');

const categoryController = {
  // SEARCH PAGINATION CATEGORY
  search: async (req: Request, res: Response) => {
    const { pageIndex, pageSize } = req.query;
    const params: Params = {
      pageIndex: pageIndex ? parseInt(pageIndex.toString()) : 0,
      pageSize: pageSize ? parseInt(pageSize.toString()) : 10,
    };
    try {
      const category = await categoryService.getPagination(params);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET BY ID CATEGORY
  getCategoryById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await categoryService.getById(id);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // CREATE CATEGORY
  createCategory: async (req: Request, res: Response) => {
    try {
      const category = await categoryService.create(req);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // UPDATE CATEGORY
  updateCategory: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await categoryService.update(id, req);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // DELETE CATEGORY
  deleteCategory: async (req: Request, res: Response) => {
    const { ids } = req.query;
    try {
      const { message } = await categoryService.delete(ids);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default categoryController;
