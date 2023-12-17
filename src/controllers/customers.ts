import { Exception } from '@app/exception';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import CustomerModel from '@app/models/customers';
import CustomerService from '@app/services/customers';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const customerService = new CustomerService(CustomerModel, 'customer');

const customerController = {
  // SEARCH PAGINATION
  search: async (req: Request, res: Response) => {
    try {
      const { pageIndex, pageSize, fullName } = req.query;
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
        fullName: fullName?.toString(),
      };
      const result = await customerService.getPaginationExcludePw(params);

      res.status(HttpStatusCode.OK).json(result);
    } catch (error: any) {
      console.log('🚀 ~ file: customer.ts:22 ~ search: ~ error:', error);
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error?.message);
    }
  },

  // UPDATE
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const { message } = await customerService.updateOverriding(id, req);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // GET BY ID
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const customerById = await customerService.getById(id);
      res.status(HttpStatusCode.OK).json(customerById);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response) => {
    const { ids } = req.query;
    try {
      const { message } = await customerService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },
};

export default customerController;
