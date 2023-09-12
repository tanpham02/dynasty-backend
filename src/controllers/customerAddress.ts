import CustomerAddressModel from '@app/models/customerAddress';
import CustomerAddressService from '@app/services/customerAddress';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const customerAddressService = new CustomerAddressService(CustomerAddressModel, 'list address');

const customerAddressController = {
  findAll: async (req: Request, res: Response) => {
    try {
      const listAddress = await customerAddressService.getAll();
      res.status(200).json(listAddress);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getListAddressByCustomerId: async (req: Request, res: Response) => {
    const { customerId } = req.params;
    try {
      const listAddress = await customerAddressService.getAddressByCustomerId(customerId);
      res.status(200).json(listAddress);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addAddress: async (req: Request, res: Response) => {
    const { customerId } = req.query;
    try {
      const newListAddress = await customerAddressService.addAddress(customerId, req);
      res.status(200).json(newListAddress);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  update: async (req: Request, res: Response) => {
    const { itemAddressId } = req.params;
    try {
      const { message } = await customerAddressService.updateAddress(itemAddressId, req);

      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteItem: async (req: Request, res: Response) => {
    const { itemAddressId } = req.params;
    try {
      const { message } = await customerAddressService.deleteAddress(itemAddressId, req);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  delete: async (req: Request, res: Response) => {
    const { ids } = req.query;
    try {
      const { message } = await customerAddressService.delete(ids);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default customerAddressController;
