import CartModel from '@app/models/cart';
import CartService from '@app/services/cart';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const cartService = new CartService(CartModel, 'cart');

const cartController = {
  // ADD CART
  updateCart: async (req: Request, res: Response) => {
    const { customerId } = req.params;
    console.log('gau gau');

    try {
      const ress = await cartService.updateCart(customerId, req);
      res.status(200).json(ress);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET CART BY CUSTOMER_ID
  getCartById: async (req: Request, res: Response) => {
    const { customerId } = req.params;
    try {
      const cart = await cartService.getCartByCustomerId(customerId);
      //   if (!cart) {
      //     return res.status(404).json({ message: 'Not found cart!' });
      //   }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default cartController;
