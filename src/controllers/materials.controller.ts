/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { MaterialModel } from '@app/models';
import { MaterialService } from '@app/services';
import { HttpStatusCode, Params } from '@app/types';

const materialService = new MaterialService(MaterialModel, 'material');

const materialController = {
  // SEARCH PAGINATION
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex = 0, pageSize = 10, from, to, sortBy } = req.query;
    try {
      const params: Params = {
        from: from?.toString(),
        to: to?.toString(),
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize),
        sortBy: sortBy?.toString(),
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
      const newMaterial = await materialService.createMaterial(req);
      res.status(HttpStatusCode.OK).json(newMaterial);
    } catch (error) {
      next(500);
    }
  },

  // UPDATE MATERIAL
  updateMaterial: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const material = await materialService.updateMaterial(id, req);
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
      await materialService.deleteMaterial(id);
      res.status(200).json({ message: 'Delete material success' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default materialController;
