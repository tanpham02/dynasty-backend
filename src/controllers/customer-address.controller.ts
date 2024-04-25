import { NextFunction, Request, Response } from 'express';

import { CustomerAddressModel } from '@app/models';
import { CustomerAddressService } from '@app/services';
import { HttpStatusCode } from '@app/types';

const customerAddressService = new CustomerAddressService(CustomerAddressModel, 'customer address');

const customerAddressController = {
  // GET CUSTOMER ADDRESS BY CUSTOMER ID
  getCustomerAddressByCustomerId: async (req: Request, res: Response, next: NextFunction) => {
    const { customerId } = req.params;
    try {
      const listAddress = await customerAddressService.getAddressByCustomerId(customerId);
      res.status(HttpStatusCode.OK).json(listAddress);
    } catch (error) {
      next(error);
    }
  },

  // ADD CUSTOMER ADDRESS ITEM
  addCustomerAddressItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCustomerAddressItem = await customerAddressService.addCustomerAddressItem(req);
      res.status(HttpStatusCode.OK).json(newCustomerAddressItem);
    } catch (error) {
      next(error);
    }
  },

  // UPDATE CUSTOMER ADDRESS ITEM
  updateCustomerAddressItem: async (req: Request, res: Response, next: NextFunction) => {
    const { customerAddressItemId } = req.params;
    try {
      const response = await customerAddressService.updateCustomerAddressItem(
        customerAddressItemId,
        req,
      );

      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // DELETE CUSTOMER ADDRESS ITEM
  deleteCustomerAddressItem: async (req: Request, res: Response, next: NextFunction) => {
    const { customerAddressItemId } = req.params;
    try {
      const { message } =
        await customerAddressService.deleteCustomerAddressItem(customerAddressItemId);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default customerAddressController;
