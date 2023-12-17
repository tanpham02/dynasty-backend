/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Exception } from '@app/exception';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import ShopSystemModel from '@app/models/storeSystem';
import ShopSystemClass from '@app/services/shopSystem';
import { Params } from '@app/types';
const ShopSystemService = new ShopSystemClass(ShopSystemModel, 'shop system');
import { Request, Response } from 'express';

const shopSystemController = {
  //SEARCH PAGINATION SYSTEM STORE
  search: async (req: Request, res: Response) => {
    const { pageIndex, pageSize, name, cityId, districtId, wardId } = req.query;
    try {
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
        name: name?.toString(),
        cityId: Number(cityId),
        districtId: Number(districtId),
        wardId: Number(wardId),
      };
      const shopSystem = await ShopSystemService.getPagination(params);
      res.status(HttpStatusCode.OK).json(shopSystem);
    } catch (error: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error.message);
    }
  },

  //CREATE SYSTEM STORE
  create: async (req: Request, res: Response) => {
    try {
      const shopSystem = await ShopSystemService.create(req, '');
      res.status(HttpStatusCode.OK).json(shopSystem);
    } catch (error) {
      console.log('🚀 ~ file: shopSystem.ts:34 ~ create: ~ error:', error);
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  //UPDATE SYSTEM STORE
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const { message } = await ShopSystemService.update(id, req, '');
      res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error?.message || INTERNAL_SERVER_ERROR_MSG);
    }
  },

  //GET SYSTEM STORE BY ID
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const shopSystem = await ShopSystemService.getById(id);
      res.status(HttpStatusCode.OK).json(shopSystem);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // DELETE SYSTEM STORE
  delete: async (req: Request, res: Response) => {
    const { ids } = req.query;
    console.log('🚀 ids:', ids);
    try {
      const { message } = await ShopSystemService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      console.log('🚀 ~ file: shopSystem.ts:76 ~ delete: ~ error:', error);
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },
};

export default shopSystemController;
