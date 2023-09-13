import ProductModel from '@app/models/product';
import { ProductType } from '@app/models/product/@type';
import ProductService from '@app/services/product';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const productService = new ProductService(ProductModel, 'product');

const productController = {
  //SEARCH PAGINATION PRODUCT
  search: async (req: Request, res: Response) => {
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
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //CREATE PRODUCT
  create: async (req: Request, res: Response) => {
    try {
      const product = await productService.createOverriding(req);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //UPDATE PRODUCT
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const { message } = await productService.updateOverriding(id, req);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //GET PRODUCT BY ID
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const product = await productService.getByIdOverridingHavePopulate(id, 'productVariantId');
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // DELETE PRODUCT
  delete: async (req: Request, res: Response) => {
    const { ids } = req.query;
    try {
      const { message } = await productService.deleteOverriding(ids);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default productController;
