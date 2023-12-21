/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Model } from 'mongoose';
import CRUDService from './crudService';
import { ActionType, Cart } from '@app/models/carts/@type';
import { Request } from 'express';
import { Product } from '@app/models/products/@type';
import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';
import { comparingObjectId } from '@app/utils/comparingObjectId';

class CartService extends CRUDService<Cart> {
  constructor(model: Model<Cart>, nameService: string) {
    super(model, nameService);
  }

  async addCartItem(customerId: string, req: Request) {
    const cart = await this.model.findOne({ customerId: customerId });
    const cartDTO: Cart['products'] = JSON.parse(JSON.stringify(req.body.products)) || [];
    if (!cart) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Cart not found');
      throw exception;
    }

    const handleAddCartItem = async (cartItemDTO: any, cartRecord: any) => {
      if (comparingObjectId(cartItemDTO.product, cartRecord.product)) {
        const quantity = cartItemDTO.productQuantities + cartRecord.productQuantities;

        await this.model.updateOne(
          {
            'products.product': cartItemDTO.product,
          },
          {
            $set: {
              'products.$.productQuantities': quantity,
              'products.$.note': cartItemDTO?.note || cartRecord?.note,
            },
          },
          { new: true },
        );
      } else {
        await cart.updateOne(
          {
            $push: { products: cartItemDTO },
          },
          { new: true },
        );
      }
    };

    cart.products?.forEach((productItemRecord) => {
      if (cart?.products && cart.products?.length > 0) {
        cartDTO?.find((itemDTO) => {
          handleAddCartItem(itemDTO, productItemRecord);
        });
      } else {
        (async () => {
          await cart.updateOne(
            {
              $set: { products: cartDTO },
            },
            { new: true },
          );
        })();
      }
    });
  }

  async updateCartITem(customerId: string, req: Request) {
    const cart = await this.model.findOne({ customerId: customerId });
    const cartDTO: Cart['products'] = JSON.parse(JSON.stringify(req.body.products)) || [];

    const handleUpdateCartItem = async (cartItemDTO: any, cartRecord: any) => {
      if (comparingObjectId(cartItemDTO.product, cartRecord.product)) {
        if (cartItemDTO.productQuantities !== 0) {
          await this.model.updateOne(
            {
              customerId: customerId,
              'products.product': cartRecord.product,
            },
            {
              $set: {
                'products.$.productQuantities': cartItemDTO.productQuantities,
                'products.$.note': cartItemDTO?.note || cartRecord?.note,
              },
            },
            { new: true },
          );
        } else {
          await cart?.updateOne(
            {
              $pull: {
                products: { product: cartItemDTO.product },
              },
            },
            { new: true },
          );
        }
      }
    };

    cartDTO?.forEach((itemDTO) => {
      cart?.products?.find((productItemRecord) => {
        handleUpdateCartItem(itemDTO, productItemRecord);
      });
    });
  }

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
