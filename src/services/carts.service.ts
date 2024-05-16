/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { Model } from 'mongoose';

import Exception from '@app/exception';
import { CRUDService } from '@app/services';
import { CartProduct, Carts, HttpStatusCode } from '@app/types';
import { comparingObjectId } from '@app/utils';

class CartService extends CRUDService<Carts> {
  constructor(model: Model<Carts>, serviceName: string) {
    super(model, serviceName);
  }

  /** ADD OR UPDATE CART ITEM */
  async addOrUpdateCartItem(customerId: string, req: Request) {
    const cartRecord = await this.model.findOne({ customerId: customerId });
    const cartRequestBody: CartProduct = req.body;

    if (!cartRecord)
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Not found carts with customer id');

    if (cartRecord?.products && cartRequestBody) {
      const cartItemMatching = cartRecord.products.find((productItemRecord: any) =>
        comparingObjectId(cartRequestBody._id!, productItemRecord._id),
      );

      if (!cartItemMatching) {
        return await this.model.updateOne(
          {
            customerId: customerId,
          },
          { $push: { products: cartRequestBody } },
          { new: true },
        );
      }

      const dataUpdate: CartProduct = cartRequestBody;
      return await this.model.findOneAndUpdate(
        { 'products._id': dataUpdate._id },
        {
          $set: {
            'products.$.note': cartRequestBody?.note ?? cartItemMatching.note,
            'products.$.quantity': (cartRequestBody?.quantity || 1) + cartItemMatching.quantity!,
          },
        },
        {
          new: true,
        },
      );
    }
  }

  /** DELETE CART */
  async deleteCartItem(customerId: string, cartItemId: string) {
    const cartItem = await this.model.findOne({
      'products._id': cartItemId,
    });
    const cartsByCustomerId = await this.model.findOne({ customerId: customerId });

    if (!cartsByCustomerId)
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Not found cart with customer id');

    if (!cartItem)
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Not found product item with product id');

    await cartItem.updateOne(
      {
        $pull: {
          products: {
            _id: cartItemId,
          },
        },
      },
      { new: true },
    );
  }

  async getCartByCustomerId(customerId: string) {
    const carts = await this.model.findOne({ customerId: customerId });
    if (!carts) throw new Exception(HttpStatusCode.NOT_FOUND, 'Cart not found');

    const cartResponse = await carts.populate('products.product');

    if (carts?.products && carts.products.length) {
      const total = cartResponse.products?.reduce((acc: any, next: any) => {
        const item = next?.product as unknown as any;
        return acc + item?.productItem?.price * next?.quantity;
      }, 0);
      cartResponse.total = total || 0;
    }
    cartResponse.quantity = carts.products?.length;
    return cartResponse;
  }

  async clearCart(customerId: string) {
    await this.model.updateOne(
      { customerId: customerId },
      {
        $set: {
          products: [],
        },
      },
      { new: true },
    );
  }
}

export default CartService;
