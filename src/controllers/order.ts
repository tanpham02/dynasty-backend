import OrderModel from '@app/models/order';
import { StatusOrder } from '@app/models/order/@type';
import CategoryService from '@app/services/category';
import OrderService from '@app/services/order';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const orderService = new OrderService(OrderModel, 'order');

const orderController = {
  // SEARCH PAGINATION
  searchPagination: async (req: Request, res: Response) => {
    const { pageIndex, pageSize } = req.query;
    const params: Params = {
      pageIndex: pageIndex ? parseInt(pageIndex.toString()) : 0,
      pageSize: pageSize ? parseInt(pageSize.toString()) : 10,
    };

    try {
      const order = await orderService.getPaginationOverriding(params);
      res.status(200).json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // GET ORDER BY ID
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await orderService.getById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // CHECKOUT
  checkout: async (req: Request, res: Response) => {
    try {
      const newOrder = await orderService.checkout(req);
      res.status(200).json(newOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // UPDATE STATUS ORDER
  updateStatusOrder: async (req: Request, res: Response) => {
    const { orderId, statusOrderRequest } = req.query;
    try {
      const { message, statusCode } = await orderService.updateStatusOrder(
        statusOrderRequest as StatusOrder,
        orderId?.toString() ?? '',
      );
      res.status(statusCode).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default orderController;
