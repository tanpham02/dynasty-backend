/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { CartModel } from '@app/models';
import { CartService } from '@app/services';
import { HttpStatusCode } from '@app/types';

const cartService = new CartService(CartModel, 'carts');

const cartController = {
  // ADD OR UPDATE CART ITEM
  addOrUpdateCartItem: async (req: Request, res: Response, next: NextFunction) => {
    const { customerId } = req.params;
    try {
      const response = await cartService.addOrUpdateCartItem(customerId, req);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // DELETE CART
  deleteCart: async (req: Request, res: Response, next: NextFunction) => {
    const { cartItemId, customerId } = req.query;
    try {
      await cartService.deleteCartItem(String(customerId), String(cartItemId));
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
      res.status(HttpStatusCode.OK).json(cart);
    } catch (error) {
      next(error);
    }
  },
};

export default cartController;
