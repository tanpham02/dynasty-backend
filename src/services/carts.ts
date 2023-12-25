/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Model } from 'mongoose';
import CRUDService from './crudService';
import { ActionType, Cart } from '@app/models/carts/@type';
import { Request } from 'express';
import { Product } from '@app/models/products/@type';
import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';
import { comparingObjectId } from '@app/utils/comparingObjectId';
import CartModel from '@app/models/carts';

class CartService extends CRUDService<Cart> {
  constructor(model: Model<Cart>, nameService: string) {
    super(model, nameService);
  }

  async addCartItem(customerId: string, req: Request) {
    const cartRecord = await this.model.findOne({ customerId: customerId });
    const cartRequestBody = req.body;

    if (!cartRecord) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Not found with customer id');
      throw exception;
    }

    const handleAddCartItem = async (cartProductRecord: any) => {
      if (comparingObjectId(cartRequestBody.product, cartProductRecord.product)) {
        const quantity = cartRequestBody.productQuantities + cartProductRecord.productQuantities;
        await this.model.updateOne(
          {
            'products.product': cartRequestBody.product,
          },
          {
            $set: {
              'products.$.productQuantities': quantity,
              'products.$.note': cartRequestBody?.note || cartProductRecord?.note,
            },
          },
          { new: true },
        );
      } else {
        await cartRecord?.updateOne(
          {
            $push: { products: cartRequestBody },
          },
          { new: true },
        );
      }
    };

    if (cartRecord?.products && cartRecord.products?.length > 0) {
      cartRecord.products.find((productItemRecord) => handleAddCartItem(productItemRecord));
    } else {
      (async () => {
        await cartRecord?.updateOne(
          {
            $push: { products: cartRequestBody },
          },
          { new: true },
        );
      })();
    }
  }

  //   async updateCartITem(customerId: string, req: Request) {
  //     const cartRecord = await this.model.findOne({ customerId: customerId });
  //     const cartRequestBody = req.body;

  //     if (!cartRecord) {
  //       const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Not found with customer id');
  //       throw exception;
  //     }

  //     const handleUpdateCartItem = async (cartRecord: any) => {
  //       if (comparingObjectId(cartRequestBody.product, cartRecord.product)) {
  //         if (cartRequestBody.productQuantities !== 0) {
  //           await this.model.updateOne(
  //             {
  //               customerId: customerId,
  //               'products.product': cartRecord.product,
  //             },
  //             {
  //               $set: {
  //                 'products.$.productQuantities': cartRequestBody.productQuantities,
  //                 'products.$.note': cartRequestBody?.note || cartRecord?.note,
  //               },
  //             },
  //             { new: true },
  //           );
  //         } else {
  //           await cartRecord?.updateOne(
  //             {
  //               $pull: {
  //                 products: { product: cartItemDTO.product },
  //               },
  //             },
  //             { new: true },
  //           );
  //         }
  //       }
  //     };

  //     cartRecord?.products?.find((productItemRecord) => handleUpdateCartItem(productItemRecord));
  //   }

  async deleteCartItem(customerId: string, productIds: string[]) {
    await this.model.updateMany(
      { customerId: customerId },
      {
        $pull: {
          products: {
            product: {
              $in: productIds,
            },
          },
        },
      },
      { new: true },
    );
  }

  async getCartByCustomerId(customerId: string) {
    const cart = await this.model.findOne({ customerId: customerId });
    if (!cart) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Cart not found');
      throw exception;
    }

    const cartResponse = await cart.populate('products.product');
    if (cart?.products && cart.products.length) {
      const totalCart = cartResponse.products?.reduce((acc: any, next: any) => {
        const item = next?.product as unknown as any;
        return acc + item?.productItem?.price * next?.productQuantities;
      }, 0);
      cartResponse.totalCart = totalCart || 0;
    }
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
