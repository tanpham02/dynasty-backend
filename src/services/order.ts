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
import UserModel from '@app/models/user';
import CustomerService from './customer';
import CustomerModel from '@app/models/customer';

const customerService = new CustomerService(CustomerModel, 'customer');
const cartService = new CartService(CartModel, 'cart');
const voucherService = new VoucherService(VoucherModel, 'voucher');

class OrderService extends CRUDService<Order> {
  constructor(model: Model<Order>, nameService: string) {
    super(model, nameService);
  }

  // SEARCH PAGINATION
  async getPaginationOverriding(params: Params) {
    try {
      const { pageIndex, pageSize } = params;

      const filter: Filter = {};
      const data = await this.model
        .find(filter)
        .limit(pageSize)
        .skip(pageSize * pageIndex);
      const totalElement = await this.model.find(filter).count();
      const totalPages = Math.ceil(totalElement / pageSize);
      const isLastPage = pageIndex + 1 >= totalPages;
      const result = {
        data: data.sort(
          (a, b) => new Date(b?.createdAt ?? '').getTime() - new Date(a?.createdAt ?? '').getTime(),
        ),
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
          if (!voucher?.customerIdsUsedVoucher?.includes(customerId)) {
            await voucher?.updateOne({
              $push: { customerIdsUsedVoucher: customerId },
            });
          }
          newData = {
            ...newData,
            totalOrder: newData.totalOrder - (voucher?.discount ?? 0),
          };
        }
      }

      const newOrder = new this.model(newData);
      const customer = await customerService.getById(customerId);
      if (customer) {
        await customer?.updateOne({ $push: { orderIds: newOrder._id } });
      }
      return await newOrder.save();
    } catch (error) {
      throw new Error(`Occur error when checkout ${this.nameService}`);
    }
  }

  // UPDATE STATUS ORDER
  async updateStatusOrder(status: StatusOrder, orderId: string) {
    try {
      if (orderId) {
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
