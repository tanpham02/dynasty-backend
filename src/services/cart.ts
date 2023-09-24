import { Model } from 'mongoose';
import CRUDService from './crudService';
import { Cart } from '@app/models/cart/@type';
import { Request } from 'express';

class CartService extends CRUDService<Cart> {
  constructor(model: Model<Cart>, nameService: string) {
    super(model, nameService);
  }

  async addCart(customerId: string, req: Request) {
    try {
      if (customerId) {
        await this.model.findOneAndUpdate(
          { customerId: customerId },
          { $push: { products: req.body } },
        );
      }
    } catch (error) {
      throw new Error(`Occur error when add to cart`);
    }
  }

  async getCartByCustomerId(customerId: string) {
    try {
      const cart = await this.model.findOne({ customerId: customerId });
      return cart;
    } catch (error) {
      throw new Error(`Occur error when add to cart`);
    }
  }
}

export default CartService;
