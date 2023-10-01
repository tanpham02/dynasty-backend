import { Order, StatusOrder } from '@app/models/order/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import { Filter, Params } from '@app/types';
import { Request } from 'express';
import VoucherModel from '@app/models/voucher';
import CartModel from '@app/models/cart';
import CartService from './cart';
import { Cart } from '@app/models/cart/@type';
import VoucherService from './voucher';

const cartService = new CartService(CartModel, 'cart');
const voucherService = new VoucherService(VoucherModel, 'voucher');

class OrderService extends CRUDService<Order> {
  constructor(model: Model<Order>, nameService: string) {
    super(model, nameService);
  }

  // SEARCH PAGINATION
  async getPaginationOverriding(params: Params) {
    try {
      const { pageIndex, pageSize, sortByField } = params;

      const filter: Filter = {};
      const data = await this.model
        .find(filter)
        .sort('createdAt')
        .limit(pageSize)
        .skip(pageSize * pageIndex);
      const totalElement = await this.model.find(filter).count();
      const totalPages = Math.ceil(totalElement / pageSize);
      const isLastPage = pageIndex + 1 >= totalPages;
      const result = {
        data: await data.sort(),
        totalElement,
        pageIndex,
        pageSize,
        totalPage: totalPages,
        isLastPage: isLastPage,
      };
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when fetching ${this.nameService} with ${error}`);
    }
  }

  // CHECKOUT
  async checkout(req: Request) {
    const customerId = req?.body?.customerId;
    const voucherId = req?.body?.voucherId;
    let newData = { ...req.body };
    try {
      if (customerId) {
        const productCartQuery: Cart = await cartService.getCartByCustomerId(customerId);
        if (productCartQuery) {
          const { customerId, ...remainingProductCartQuery } = productCartQuery;
          const shipFee = 25000;
          newData = {
            ...newData,
            productFromCart: { ...remainingProductCartQuery },
            totalOrderAmountBeforeUseDiscount: remainingProductCartQuery.totalCart,
            totalOrder: remainingProductCartQuery.totalCart + shipFee,
            shipFee,
          };
        }
        if (voucherId) {
          const voucher = await VoucherModel.findById(voucherId);
          await voucher?.updateOne({
            $push: { customerIdsUsedVoucher: customerId },
          });

          newData = {
            ...newData,
            totalOrder: newData.totalOrder - (voucher?.discount ?? 0),
          };
        }
      }

      const newOrder = new this.model(newData);
      return await newOrder.save();
    } catch (error) {
      console.log('🚀 error', error);
      throw new Error(`Occur error when checkout ${this.nameService}`);
    }
  }

  // UPDATE STATUS ORDER
  async updateStatusOrder(status: StatusOrder, orderId: string) {
    try {
      if (orderId) {
        console.log('order by id', await this.model.findOne({ _id: orderId }));
        await this.model.findOneAndUpdate({ _id: orderId }, { $set: { statusOrder: status } });
        return {
          message: 'Update status order success',
          statusCode: 200,
        };
      }
      return {
        message: `Not found order with this ${orderId}`,
        statusCode: 404,
      };
    } catch (error) {
      throw new Error(`Occur error when change status ${this.nameService}`);
    }
  }
}

export default OrderService;
