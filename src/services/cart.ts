import { Model } from 'mongoose';
import CRUDService from './crudService';
import { ActionType, Cart, CartProduct } from '@app/models/cart/@type';
import { Request } from 'express';

class CartService extends CRUDService<Cart> {
  constructor(model: Model<Cart>, nameService: string) {
    super(model, nameService);
  }

  async addCart(customerId: string, req: Request) {
    let messageRes: {
      message: string;
    } = { message: '' };
    try {
      if (customerId) {
        const cartAfterFindByCustomerId = await this.model.findOne({ customerId: customerId });
        const productItemFromBody = req?.body?.products?.[0];

        const productItemFromDatabase = await this.model.findOne({
          customerId: customerId,
          'products.productId': productItemFromBody?.productId,
        });

        if (
          productItemFromDatabase &&
          new Object(productItemFromDatabase.customerId).valueOf() === customerId &&
          productItemFromBody.actionType === ActionType.UPDATE
        ) {
          await this.model.updateOne(
            {
              'products.productId': productItemFromBody?.productId,
            },
            {
              $set: {
                'products.$.quantityProducts': productItemFromBody?.quantityProducts,
              },
            },
            { new: true },
          );
          messageRes = {
            message: 'Update cart item successfully',
          };
        }
        if (productItemFromBody.actionType === ActionType.ADD) {
          cartAfterFindByCustomerId?.products &&
            (await cartAfterFindByCustomerId?.updateOne(
              {
                $set: {
                  products: [...cartAfterFindByCustomerId?.products, ...[productItemFromBody]],
                },
              },
              { new: true },
            ));
          messageRes = {
            message: 'Add cart item successfully',
          };
        }

        if (
          productItemFromDatabase &&
          new Object(productItemFromDatabase.customerId).valueOf() === customerId &&
          productItemFromBody.actionType === ActionType.DELETE
        ) {
          console.log(
            'customerId',
            new Object(productItemFromDatabase.customerId).valueOf(),
            customerId,
          );
          await productItemFromDatabase.updateOne(
            {
              $pull: {
                products: { productId: productItemFromBody?.productId },
              },
            },
            { new: true },
          );
          messageRes = { message: 'Delete cart item successfully' };
        }
      }
      return messageRes;
    } catch (error) {
      console.log('error', error);
      throw new Error(`Occur error when add to cart`);
    }
  }

  async getCartByCustomerId(customerId: string) {
    try {
      const cart = await this.model
        .findOne({ customerId: customerId })
        .populate('products.productId');
      return cart;
    } catch (error) {
      throw new Error(`Occur error when add to cart`);
    }
  }
}

export default CartService;
