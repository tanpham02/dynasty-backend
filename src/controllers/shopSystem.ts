import ShopSystemModel from '@app/models/shopSystem';
import ShopSystemClass from '@app/services/shopSystem';
import { Params } from '@app/types';
const ShopSystemService = new ShopSystemClass(ShopSystemModel, 'shop system');
import { Request, Response } from 'express';

const shopSystemController = {
  //SEARCH PAGINATION SYSTEM STORE
  search: async (req: Request, res: Response) => {
    const { pageIndex, pageSize, name, categoryId } = req.query;
    try {
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
        name: name?.toString(),
        categoryId: categoryId?.toString(),
      };
      const shopSystem = await ShopSystemService.searchPagination(params);
      res.status(200).json(shopSystem);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //CREATE SYSTEM STORE
  create: async (req: Request, res: Response) => {
    try {
      const shopSystem = await ShopSystemService.create(req);
      res.status(200).json(shopSystem);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //UPDATE SYSTEM STORE
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const shopSystem = await ShopSystemService.update(id, req);
      res.status(200).json(shopSystem);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //GET SYSTEM STORE BY ID
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const shopSystem = await ShopSystemService.getById(id);
      if (!shopSystem) {
        return res.status(404).json({ message: 'Shop system not found.' });
      }
      res.status(200).json(shopSystem);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // DELETE SYSTEM STORE
  delete: async (req: Request, res: Response) => {
    const { ids } = req.query;
    console.log('🚀 ids:', ids);
    try {
      const { message } = await ShopSystemService.delete(ids);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default shopSystemController;
