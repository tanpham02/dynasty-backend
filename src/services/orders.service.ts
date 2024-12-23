/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { Model } from 'mongoose';

import Exception from '@app/exception';
import {
  CartModel,
  dbContext,
  OrderModel,
  ProductModel,
  ProductVariantModel,
  StoreConfigModel,
} from '@app/models';
import { CRUDService, CartService } from '@app/services';
import { HttpStatusCode, OrderStatus, OrderType, Orders } from '@app/types';
import { timeByLocalTimeZone } from '@app/utils';
import { isEmpty, uniq } from 'lodash';

class OrderService extends CRUDService<Orders> {
  constructor(model: Model<Orders>, serviceName: string) {
    super(model, serviceName);
  }

  // GET ORDER BY ID
  async getOrderById(orderId: string) {
    const order = await this.model.findById(orderId).then(
      (res) =>
        res?.populate([
          {
            path: 'products.product',
            model: 'ProductVariant',
          },
          {
            path: 'customerId',
            model: 'Customer',
          },
          {
            path: 'storeId',
            model: 'StoreSystem',
          },
        ]),
    );

    return order;
  }

  // CHECKOUT
  async checkout(req: Request) {
    const orderRequestBody: Orders = req.body;

    let newOrder = { ...orderRequestBody, shipFee: 0 };
    let subTotal = 0;

    const storeConfig = await StoreConfigModel.find();

    if (orderRequestBody.orderType === OrderType.DELIVERY) {
      const feeShip = Number(storeConfig?.[0]?.storeSetting?.feeShip) || 0;
      newOrder.shipFee = feeShip;
    }

    if (orderRequestBody?.orderReceivingTimeAt) {
      newOrder.orderReceivingTimeAt = timeByLocalTimeZone(orderRequestBody.orderReceivingTimeAt);
    }

    const productVariantIds =
      orderRequestBody?.products &&
      orderRequestBody.products.length &&
      orderRequestBody.products.map((item) => item.product);

    const productVariants = await ProductVariantModel.find({
      _id: {
        $in: productVariantIds,
      },
    });

    subTotal = productVariants.reduce((acc, next, index) => {
      return (
        acc + (next?.productItem?.price || 0) * (orderRequestBody?.products?.[index]?.quantity || 0)
      );
    }, 0);

    newOrder = {
      ...newOrder,
      subTotal,
      total: subTotal + newOrder.shipFee!,
      storeId: newOrder.storeId!,
      orderStatus: OrderStatus.PENDING,
    };

    const productParentIds = uniq(productVariants?.map((item) => item?.parentId));

    const newOrderModel = new OrderModel(newOrder);
    const order = await newOrderModel.save();
    await new CartService(CartModel, 'carts').clearCart(orderRequestBody.customerId!);

    if (!isEmpty(productParentIds)) {
      const products = await ProductModel.find({
        _id: {
          $in: productParentIds,
        },
      })?.lean();

      if (!isEmpty(products)) {
        await Promise.all(
          products.map(async (item) => {
            await ProductModel.updateOne(
              { _id: item!._id.toString() },
              {
                $set: {
                  totalOrder: item.totalOrder! + 1,
                },
              },
              { new: true },
            );
          }),
        );
      }
    }

    return order;
  }

  //RE-ORDER
  async reorder(orderId: string, customerId: string, req: Request) {
    const orderDetail = await this.model.findById(orderId);

    if (!orderDetail)
      throw new Exception(HttpStatusCode.NOT_FOUND, `Not found order item with id ${orderId}`);

    const productIds = orderDetail.products;
    if (orderDetail && productIds) {
      for (const productId of productIds) {
        req.body = productId;
        await new CartService(CartModel, 'carts').addOrUpdateCartItem(customerId, req);
      }
    }
    return {
      message: 'OK',
    };
  }

  // UPDATE STATUS ORDER
  async updateStatusOrder(status: string, orderId: string) {
    const orderDetail = await OrderModel.findById(orderId).lean();

    if (!orderDetail) throw new Exception(HttpStatusCode.NOT_FOUND, 'Not found order');

    await OrderModel.findOneAndUpdate({ _id: orderId }, { $set: { orderStatus: status } });
    return {
      message: 'Update status order success',
    };
  }

  // CANCEL ORDER
  async cancelOrder(orderId: string, reason: string) {
    const orderDetail = await this.getById(orderId);

    if (!orderDetail) throw new Exception(HttpStatusCode.NOT_FOUND, 'Not found order');

    await this.model.findOneAndUpdate(
      {
        _id: orderId,
      },
      {
        $set: { reasonCancel: reason, orderStatus: OrderStatus.CANCELED },
      },
      { new: true },
    );
    return { message: 'Handling...' };
  }
}

export default OrderService;
