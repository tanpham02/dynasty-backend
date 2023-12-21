/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Order, StatusCheckout, StatusOrder, TypeOrder } from '@app/models/orders/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import { Params } from '@app/types';
import { Request, Response } from 'express';
import CartModel from '@app/models/carts';
import CartService from './carts';
import StoreConfigService from './storeConfig';
import StoreConfigModel from '@app/models/storeConfig';
import { FIELDS_NAME } from '@app/constants';
import StoreSystemService from './storeSystem';
import StoreSystemModel from '@app/models/storeSystem';
import VoucherService from './vouchers';
import VoucherModel from '@app/models/vouchers';
import OrderModel from '@app/models/orders';
import ProductVariantModel from '@app/models/productVariants';
import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';

const storeConfigService = new StoreConfigService(StoreConfigModel, 'store config');
const cartService = new CartService(CartModel, 'cart');
const storeSystemService = new StoreSystemService(StoreSystemModel, 'store system');
const voucherService = new VoucherService(VoucherModel, 'voucher');

class OrderService extends CRUDService<Order> {
  constructor(model: Model<Order>, nameService: string) {
    super(model, nameService);
  }

  // SEARCH PAGINATION
  async getPaginationOverriding(params: Params) {
    const { data, ...remaining } = await this.getPagination(params);

    const dataCustom = data.sort(
      (a, b) => new Date(b?.createdAt ?? '').getTime() - new Date(a?.createdAt ?? '').getTime(),
    );

    return {
      ...remaining,
      data: dataCustom,
    };
  }

  // GET ORDER BY ID
  async getOrderById(orderId: string) {
    const order = await this.model.findById(orderId).then(
      (res) =>
        res?.populate([
          {
            path: 'productsFromCart.product',
            model: 'ProductVariant',
          },
          {
            path: 'productsWhenTheCustomerIsNotLoggedIn.product',
            model: 'ProductVariant',
          },
        ]),
    );

    return order;
  }

  // CHECKOUT
  async checkout(req: Request) {
    const orderDTO: Order = JSON.parse(req.body?.[FIELDS_NAME.ORDER]);

    if (orderDTO.statusCheckout === StatusCheckout.VERIFY_INFORMATION) {
      let newOrder: any = { ...orderDTO };
      const storeConfig = await storeConfigService.findAll();
      const storeDetail = await storeSystemService.getById(String(orderDTO?.orderAtStore));

      if (orderDTO.typeOrder === TypeOrder.ORDER_DELIVERING) {
        const feeShip = storeConfig?.[0]?.feeShip;
        newOrder.shipFee = feeShip;
      }
      if (orderDTO.typeOrder === TypeOrder.ORDER_TO_PICK_UP) {
        newOrder.shipFee = 0;
      }

      if (orderDTO?.customerId) {
        const cartLists = await cartService.getCartByCustomerId(String(orderDTO.customerId));

        const totalCart = cartLists?.totalCart;
        const productsFromCart = cartLists?.products;

        newOrder = {
          ...newOrder,
          totalAmountBeforeUsingDiscount: totalCart || 0 + newOrder.shipFee,
          totalOrder: totalCart || 0 + newOrder.shipFee,
          productsFromCart: productsFromCart,
          orderAtStore: storeDetail,
          statusOrder: StatusOrder.WAITING_FOR_PAYMENT,
        };
      } else {
        const productLists = [];
        const productWhenCustomerIsNotLogin = orderDTO?.productsWhenTheCustomerIsNotLoggedIn;
        if (productWhenCustomerIsNotLogin && productWhenCustomerIsNotLogin?.length) {
          for (let i = 0; i < productWhenCustomerIsNotLogin.length; i++) {
            const element = productWhenCustomerIsNotLogin[i];
            const productItem = await ProductVariantModel.findById(element?.product);
            if (productItem) {
              productLists.push({
                product: productItem,
                note: element.note,
                productQuantities: element.productQuantities,
              });
            }
          }
        }
        const totalAmount = productLists?.reduce((acc: any, next) => {
          let result: number = 0;
          if (next?.product?.productItem?.price) {
            result = acc + next.product.productItem.price * next.productQuantities;
          }
          return result;
        }, 0);

        newOrder = {
          ...newOrder,
          totalAmountBeforeUsingDiscount: totalAmount || 0 + newOrder.shipFee,
          totalOrder: totalAmount || 0 + newOrder.shipFee,
          productsWhenTheCustomerIsNotLoggedIn: productLists,
          orderAtStore: storeDetail,
          statusOrder: StatusOrder.WAITING_FOR_PAYMENT,
        };
      }

      const newOrderModel = new OrderModel(newOrder);
      await newOrderModel.save();
      return newOrder;
    }

    if (orderDTO.statusCheckout === StatusCheckout.ORDER_CONFIRMATION) {
      const orderDetail = await this.getOrderById(String(orderDTO._id));
      let updateData: any = { ...orderDTO };
      if (orderDTO?.voucherId) {
        const voucherDetail = await voucherService.getById(String(orderDTO.voucherId));
        if (
          voucherDetail &&
          !voucherDetail.customerIdsUsedVoucher?.includes(String(orderDTO.customerId))
        ) {
          if (voucherDetail?.discount) {
            updateData = {
              ...updateData,
              totalOrder:
                orderDetail?.totalOrder && orderDetail.totalOrder - voucherDetail?.discount,
            };
          }
          if (voucherDetail?.discountPercent) {
            updateData = {
              ...updateData,
              totalOrder:
                orderDetail?.totalOrder &&
                orderDetail.totalOrder * ((100 - voucherDetail?.discountPercent) / 100),
            };
          }
          await VoucherModel.updateOne(
            { _id: orderDTO.voucherId },
            {
              $set: { customerIdsUsedVoucher: orderDTO.customerId },
            },
            {
              new: true,
            },
          );
        }
      }
      updateData = {
        ...updateData,
        statusOrder: StatusOrder.PENDING,
      };

      await orderDetail?.updateOne(updateData, { new: true });
      await cartService.clearCart(String(orderDTO?.customerId));
      return updateData;
    }
  }

  //RE-ORDER
  async reorder(orderId: string, customerId: string, req: Request) {
    const orderDetail = await this.getOrderById(orderId).then(
      (res) => res?.depopulate('productsFromCart.product'),
    );
    if (orderDetail) {
      req.body.products = orderDetail.productsFromCart;
      await cartService.addCartItem(customerId, req);
    }
    return orderDetail;
  }

  // UPDATE STATUS ORDER
  async updateStatusOrder(status: StatusOrder, orderId: string) {
    const orderDetail = await this.getById(orderId);

    if (!orderDetail) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Not found order');
      throw exception;
    }

    await this.model.findOneAndUpdate({ _id: orderId }, { $set: { statusOrder: status } });
    return {
      message: 'Update status order success',
    };
  }

  // CANCEL ORDER
  async cancelOrder(orderId: string, reason: string) {
    const orderDetail = await this.getById(orderId);

    if (!orderDetail) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Not found order');
      throw exception;
    }

    await this.model.findOneAndUpdate(
      {
        _id: orderId,
      },
      {
        $set: { reasonOrderCancel: reason, statusOrder: StatusOrder.CANCELED },
      },
      { new: true },
    );
    return { message: 'Handling...' };
  }
}

export default OrderService;
