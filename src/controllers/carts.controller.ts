/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { CartModel } from '@app/models';
import { CartService } from '@app/services';
import { HttpStatusCode } from '@app/types';

const cartService = new CartService(CartModel, 'carts');

const cartController = {
  // ADD CART
  addCart: async (req: Request, res: Response, next: NextFunction) => {
    const { customerId } = req.params;
    try {
      await cartService.addCartItem(customerId, req);
      res.status(HttpStatusCode.OK).json({ message: 'Add cart successfully' });
    } catch (error) {
      next(error);
    }
  },

  // UPDATE CART
  updateCart: async (req: Request, res: Response, next: NextFunction) => {
    const { customerId } = req.params;
    try {
      await cartService.updateCartITem(customerId, req);
      res.status(HttpStatusCode.OK).json({ message: 'Update cart successfully' });
    } catch (error) {
      next(error);
    }
  },

  // DELETE CART
  deleteCart: async (req: Request, res: Response, next: NextFunction) => {
    const { customerId } = req.params;
    const { productId } = req.query;
    try {
      await cartService.deleteCartItem(customerId as string, productId?.toString() || '');
      res.status(HttpStatusCode.OK).json({ message: 'Delete cart successfully' });
    } catch (error) {
      next(error);
    }
  },

  // GET CART BY CUSTOMER_ID
  getCartById: async (req: Request, res: Response, next: NextFunction) => {
    const { customerId } = req.params;
    try {
      const cart = await cartService.getCartByCustomerId(customerId);
      console.log('🚀 ~ file: carts.ts:50 ~ getCartById: ~ cart:', cart);
      res.status(HttpStatusCode.OK).json(cart);
    } catch (error) {
      next(error);
    }
  },
};

export default cartController;
