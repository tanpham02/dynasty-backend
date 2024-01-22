/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpStatusCode } from '@app/exception/type';
import MaterialModel from '@app/models/materials';
import MaterialService from '@app/services/materials';
import { Params } from '@app/types';
import { NextFunction, Request, Response } from 'express';

const materialService = new MaterialService(MaterialModel, 'material');

const materialController = {
  // SEARCH PAGINATION
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex, pageSize, from, to } = req.query;
    try {
      const params: Params = {
        from: from?.toString(),
        to: to?.toString(),
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
      };
      const material = await materialService.getPagination(params);
      res.status(HttpStatusCode.OK).json(material);
    } catch (error) {
      next(error);
    }
  },

  // CREATE MATERIAL
  createMaterial: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMaterial = await materialService.createOverriding(req);
      res.status(HttpStatusCode.OK).json(newMaterial);
    } catch (error) {
      next(500);
    }
  },

  // UPDATE MATERIAL
  updateMaterial: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const material = await materialService.updateOverriding(id, req);
      res.status(HttpStatusCode.OK).json(material);
    } catch (error) {
      next(error);
    }
  },

  // GET BY ID
  getMaterialById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const material = await materialService.getById(id);
      res.status(HttpStatusCode.OK).json(material);
    } catch (error) {
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await materialService.deleteOverriding(id);
      res.status(200).json({ message: 'Delete material success' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default materialController;
