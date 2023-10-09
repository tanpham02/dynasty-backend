import { Model } from 'mongoose';
import CRUDService from './crudService';
import { ActionType, Cart, CartProduct } from '@app/models/cart/@type';
import { Request } from 'express';
import { Product } from '@app/models/product/@type';

class CartService extends CRUDService<Cart> {
  constructor(model: Model<Cart>, nameService: string) {
    super(model, nameService);
  }

  async updateCart(customerId: string, req: Request) {
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
                  products: [
                    ...cartAfterFindByCustomerId?.products,
                    ...[
                      {
                        ...productItemFromBody,
                        quantityProducts: productItemFromBody?.quantityProducts || 1,
                      },
                    ],
                  ],
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
      let total = 0;
      const cart = await this.model
        .findOne({ customerId: customerId })
        .populate('products.productId');

      if (cart?.products) {
        const totalCart = cart?.products.reduce((prev, next) => {
          const productItem = next?.productId as unknown as Product;
          return prev + productItem.price * next.quantityProducts;
        }, 0);
        return { ...JSON.parse(JSON.stringify({ ...cart }))._doc, totalCart };
      }
    } catch (error) {
      console.log('error', error);
      throw new Error(`Occur error when get cart`);
    }
  }
}

export default CartService;
