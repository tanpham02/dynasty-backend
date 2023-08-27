import ProductVariantsModel from '@app/models/productVariant';
import ProductVariantService from '@app/services/productVariant';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const productVariantService = new ProductVariantService(ProductVariantsModel, 'product variant');

const productVariantController = {
  // SEARCH PAGINATION PRODUCT VARIANT
  search: async (req: Request, res: Response) => {
    const { pageIndex, pageSize } = req.query;
    try {
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
      };
      const productVariant = await productVariantService.getPagination(params);
      res.status(200).json(productVariant);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // CREATE PRODUCT VARIANT
  create: async (req: Request, res: Response) => {
    try {
      const newProductVariant = await productVariantService.createOverriding(req);
      res.status(200).json(newProductVariant);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //UPDATE PRODUCT VARIANT
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const productVariant = await productVariantService.update(id, req);
      res.status(200).json(productVariant);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //GET PRODUCT VARIANT BY ID
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const productVariant = await productVariantService.getById(id, 'productIds');
      if (!productVariant) {
        return res.status(404).json({ message: 'Product variant not found.' });
      }
      res.status(200).json(productVariant);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // DELETE PRODUCT VARIANT
  delete: async (req: Request, res: Response) => {
    const { ids } = req.query;
    try {
      const { message } = await productVariantService.deleteOverriding(ids);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default productVariantController;
