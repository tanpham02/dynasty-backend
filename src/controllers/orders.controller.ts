/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { OrderModel } from '@app/models';
import OrderService from '@app/services/orders.service';
import { HttpStatusCode, Params } from '@app/types';

const orderService = new OrderService(OrderModel, 'order');

const orderController = {
  // SEARCH PAGINATION
  searchPagination: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex = 0, pageSize = 10, customerId, from, to, statusOrder, sortBy } = req.query;
    const params: Params = {
      customerId: customerId?.toString(),
      from: from?.toString(),
      to: to?.toString(),
      statusOrder: statusOrder?.toString(),
      pageIndex: Number(pageIndex),
      pageSize: Number(pageSize),
      sortBy: sortBy?.toString(),
    };
    try {
      const order = await orderService.getPagination(params);
      res.status(HttpStatusCode.OK).json(order);
    } catch (error) {
      next(error);
    }
  },

  // GET ORDER BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const order = await orderService.getOrderById(id);
      return res.status(HttpStatusCode.OK).json(order);
    } catch (error) {
      next(error);
    }
  },

  // CHECKOUT
  checkout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const responseOrder = await orderService.checkout(req);
      res.status(HttpStatusCode.OK).json(responseOrder);
    } catch (error) {
      next(error);
    }
  },

  // RE-ORDER
  reorder: async (req: Request, res: Response, next: NextFunction) => {
    const { customerId, orderId } = req.query;
    try {
      const { message } = await orderService.reorder(String(orderId), String(customerId), req);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },

  // UPDATE STATUS ORDER
  updateStatusOrder: async (req: Request, res: Response, next: NextFunction) => {
    const { orderStatus, orderId } = req.query;

    try {
      const { message } = await orderService.updateStatusOrder(
        String(orderStatus),
        String(orderId),
      );
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },

  // CANCEL ORDER
  requestCancelOrder: async (req: Request, res: Response, next: NextFunction) => {
    const { reason, orderId } = req.query;
    try {
      const { message } = await orderService.cancelOrder(String(orderId), String(reason));
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },

  // DELETE ORDER
  deleteOrder: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { message } = await orderService.delete(id);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default orderController;
