/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import MaterialMode from '@app/models/materials';
import MaterialService from '@app/services/materials';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const materialService = new MaterialService(MaterialMode, 'material');

const materialController = {
  // SEARCH PAGINATION
  search: async (req: Request, res: Response) => {
    const { pageIndex, pageSize, from, to } = req.query;
    try {
      const params: Params = {
        from: from?.toString(),
        to: to?.toString(),
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
      };
      const material = await materialService.getPaginationOverriding(params);
      res.status(200).json(material);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // CREATE MATERIAL
  createMaterial: async (req: Request, res: Response) => {
    try {
      const newMaterial = await materialService.createOverriding(req);
      res.status(200).json(newMaterial);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // UPDATE MATERIAL
  updateMaterial: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      //   const material = await materialService.update(id, req);
      //   res.status(200).json(material);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET BY ID
  getMaterialById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      //   const material = await materialService.getById(id);
      //   res.status(200).json(material);
    } catch (error) {
      res.status(500).json(error);
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
