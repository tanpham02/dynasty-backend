import { HttpStatusCode } from '@app/exception/type';
import CategoryModel from '@app/models/category';
import CategoryService from '@app/services/category';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const categoryService = new CategoryService(CategoryModel, 'category');

const categoryController = {
  // SEARCH PAGINATION CATEGORY
  search: async (req: Request, res: Response) => {
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
    } catch (error: any) {
      console.log('🚀 ~ file: category.ts:24 ~ search: ~ error:', error);
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error?.message);
    }
  },

  // GET BY ID CATEGORY
  getCategoryById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await categoryService.getCategoryById(id, 'productsDTO');
      if (!category) {
        return res.status(404).json({ message: 'Category not found.' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET CHILDREN CATEGORY BY ID
  getChildrenCategoryById: async (req: Request, res: Response) => {
    const { childCategoryId } = req.params;
    try {
      const childrenCategory = await categoryService.getChildrenCategoryById(childCategoryId);

      if (!childrenCategory) {
        return res.status(404).json({ message: 'Children category not found.' });
      }

      res.status(200).json(childrenCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // UPDATE CHILDREN CATEGORY
  updateChildrenCategory: async (req: Request, res: Response) => {
    const { childCategoryId } = req.params;
    try {
      const childCategory = await categoryService.updateChildrenCategory(childCategoryId, req);
      res.status(200).json(childCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // DELETE CHILDREN CATEGORY
  deleteChildrenCategory: async (req: Request, res: Response) => {
    const { parentCategoryId } = req.params;
    const { childCategoryId } = req.query;

    const { message } = await categoryService.deleteChildCategoryOverriding(
      parentCategoryId,
      childCategoryId,
    );
    try {
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // ADD CHILDREN CATEGORY
  addChildrenCategory: async (req: Request, res: Response) => {
    const { parentCategoryId } = req.params;

    const { message } = await categoryService.addChildrenCategory(parentCategoryId, req);
    try {
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // CREATE CATEGORY
  createCategory: async (req: Request, res: Response) => {
    try {
      const category = await categoryService.createOverriding(req);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // UPDATE CATEGORY
  updateCategory: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await categoryService.updateOverriding(id, req);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // DELETE CATEGORY
  deleteCategory: async (req: Request, res: Response) => {
    const { ids } = req.query;
    try {
      const { message } = await categoryService.deleteOverriding(ids);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // SEARCH PAGINATION TO SHOW (PRODUCT)
  searchPaginationShowClient: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { pageIndex, pageSize } = req.query;
      const resFromServer = await categoryService.searchPaginationToShowProduct(
        id,
        pageIndex ? Number(pageIndex) : 0,
        pageSize ? Number(pageSize) : 4,
      );

      res.status(200).json(resFromServer);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default categoryController;
