import CustomerModel from '@app/models/customer';
import CustomerService from '@app/services/customer';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const customerService = new CustomerService(CustomerModel, 'customer');

const customerController = {
  search: async (req: Request, res: Response) => {
    try {
      const { pageIndex, pageSize, fullName } = req.params;
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
        fullName: fullName,
      };
      const result = await customerService.getPagination(params);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const promotionsNew = await customerService.createOverriding(req);
      res.status(200).json(promotionsNew);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const promotions = await customerService.update(id, req);
      res.status(200).json(promotions);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const promotions = await customerService.getById(id);
      res.status(200).json(promotions);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  delete: async (req: Request, res: Response) => {
    const { ids } = req.query;
    try {
      const { message } = await customerService.delete(ids);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default customerController;
