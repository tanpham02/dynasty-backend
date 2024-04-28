/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { CustomerModel } from '@app/models';
import { CustomerService } from '@app/services';
import { HttpStatusCode, Params } from '@app/types';

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
      const result = await customerService.getPaginationExcludePassword(params);

      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  },

  // UPDATE
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const customer = await customerService.updateCustomer(id, req);
      res.status(HttpStatusCode.OK).json(customer);
    } catch (error) {
      next(error);
    }
  },

  // GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const customerById = await customerService.getByIdCustomer(id);
      res.status(HttpStatusCode.OK).json(customerById);
    } catch (error) {
      next(error);
    }
  },

  // GET BY ACCESS TOKEN
  getCustomerInfo: async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.body;
    try {
      const customerInfo = await customerService.getCustomerInfoByAccessToken(accessToken);
      res.status(HttpStatusCode.OK).json(customerInfo);
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
