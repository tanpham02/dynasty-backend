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
    const { pageIndex, pageSize, customerId, from, to, statusOrder } = req.query;
    const params: Params = {
      pageIndex: pageIndex ? parseInt(pageIndex.toString()) : 0,
      pageSize: pageSize ? parseInt(pageSize.toString()) : 10,
      customerId: customerId?.toString(),
      from: from?.toString(),
      to: to?.toString(),
      statusOrder: statusOrder?.toString(),
    };

    try {
      const order = await orderService.getPaginationOverriding(params);
      res.status(200).json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // QUICK BUY
  quickBuy: async (req: Request, res: Response) => {
    try {
      const orderWhenQuickBuy = await orderService.quickBuy(req);
      res.status(200).json(orderWhenQuickBuy);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET ORDER BY ID
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const cart = await orderService.getOrderById(id);
      if (!cart) {
        return res.status(404).json('Not found order with this id');
      }
      return res.status(200).json(cart);
    } catch (error) {
      console.log('error', error);
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

  // UPDATE TOTAL ORDER WHEN USE VOUCHER
  updateTotalOrderWhenUseVoucher: async (req: Request, res: Response) => {
    try {
      const { voucherId, customerId, orderId } = req.query;
      const updateTotalOrderWhenUseVoucher = await orderService.updateTotalOrderWhenUseVoucher(
        voucherId?.toString() || '',
        customerId?.toString() || '',
        orderId?.toString() || '',
      );

      res.status(200).json(updateTotalOrderWhenUseVoucher);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // RE-ORDER
  reorder: async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { customerId } = req.query;

    try {
      await orderService.reorder(orderId, customerId ? customerId.toString() : '', req);
      res.status(200).json('Add product in reorder to cart success');
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

  // CANCEL ORDER
  requestCancelOrder: async (req: Request, res: Response) => {
    const { orderId, reason } = req.query;
    try {
      const { message } = await orderService.cancelOrder(
        orderId?.toString() || '',
        reason?.toString() || '',
      );
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default orderController;
