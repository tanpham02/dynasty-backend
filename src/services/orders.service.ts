/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { Model } from 'mongoose';

import Exception from '@app/exception';
import { CartModel, OrderModel, ProductVariantModel, StoreConfigModel } from '@app/models';
import { CRUDService, CartService } from '@app/services';
import { HttpStatusCode, OrderStatus, OrderType, Orders } from '@app/types';
import { timeByLocalTimeZone } from '@app/utils';

class OrderService extends CRUDService<Orders> {
  constructor(model: Model<Orders>, serviceName: string) {
    super(model, serviceName);
  }

  // GET ORDER BY ID
  async getOrderById(orderId: string) {
    const order = await this.model.findById(orderId).then((res) =>
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
      const feeShip = Number(storeConfig?.[0].storeSetting?.feeShip) || 0;
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

    const newOrderModel = new OrderModel(newOrder);
    return await newOrderModel.save();
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

  //   UPDATE STATUS ORDER
  async updateStatusOrder(status: string, orderId: string) {
    const orderDetail = await this.getById(orderId);

    if (!orderDetail) throw new Exception(HttpStatusCode.NOT_FOUND, 'Not found order');

    await this.model.findOneAndUpdate({ _id: orderId }, { $set: { orderStatus: status } });
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
