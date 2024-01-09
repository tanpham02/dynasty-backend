/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Exception } from '@app/exception';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import CustomerModel from '@app/models/customers';
import CustomerService from '@app/services/customers';
import { Params } from '@app/types';
import { NextFunction, Request, Response } from 'express';

const customerService = new CustomerService(CustomerModel, 'customer');

const customerController = {
  // SEARCH PAGINATION
  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pageIndex, pageSize, fullName, customerType } = req.query;
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
        fullName: fullName?.toString(),
        customerType: customerType?.toString(),
      };
      const result = await customerService.getPaginationExcludePw(params);

      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  },

  // UPDATE
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { message } = await customerService.updateOverriding(id, req);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },

  // GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const customerById = await customerService.getByIdOverriding(id);
      res.status(HttpStatusCode.OK).json(customerById);
    } catch (error) {
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      const { message } = await customerService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default customerController;
