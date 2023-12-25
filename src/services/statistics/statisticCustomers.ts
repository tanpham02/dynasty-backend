import moment from 'moment';
import CustomerModel from '@app/models/customers';
import OrderModel from '@app/models/orders';
import { Request } from 'express';
import { CustomerType } from '@app/models/customers/@type';
import { StatusOrder } from '@app/models/orders/@type';

interface StatisticQuery {
  filterBy?: 'YEAR' | 'MONTH' | 'DAY';
  from?: string | Date;
  to?: string | Date;
  customerType?: CustomerType;
}

class StatisticService {
  async customers(req: Request) {
    const { from, to }: StatisticQuery = req.query;

    const totalQuantityCustomerByGroupCustomerType = async (target: string) => {
      const totalQuantityCustomerByGroupCustomerTypes = await CustomerModel.aggregate([
        {
          $group: {
            _id: {
              customerType: `$${target}`,
            },
            count: { $sum: 1 },
          },
        },
      ]);
      return totalQuantityCustomerByGroupCustomerTypes;
    };

    const totalQuantityCustomerByGroupCustomerTypes =
      await totalQuantityCustomerByGroupCustomerType('customerType');

    // Total quantity users
    const totalQuantityUsers = totalQuantityCustomerByGroupCustomerTypes.reduce(
      (acc, next) => acc + (next?.count || 0),
      0,
    );

    // Ger order by customer id
    const getOrdersByCustomerId = async (customerId: string) => {
      const orderDetail = await OrderModel.find({ customerId: customerId });
      return orderDetail;
    };

    let topCustomerBuyTheMostOrders: any[] = [];
    let customers: any[] = [];

    // Filter
    if (from && to) {
      const startMonth = from && new Date(moment(from.toString()).utc(true).toString());
      const endMonth = to && new Date(moment(to.toString()).utc(true).toString());
      customers = await CustomerModel.aggregate([
        {
          $match: {
            $expr: {
              $and: [{ $gte: ['$createdAt', startMonth] }, { $lte: ['$createdAt', endMonth] }],
            },
          },
        },
      ]);
    }

    // Customers filter
    if (customers.length > 0) {
      topCustomerBuyTheMostOrders = customers
        .sort((a: any, b): any => {
          if (customers.length) {
            if (customers.length > 1) {
              return b.orderIds.length - a.orderIds.length;
            }
            return customers.length;
          }
        })
        .slice(0, 4)
        .map(async (customer) => {
          const orders = await getOrdersByCustomerId(customer._id);
          let totalExpense = 0;
          if (orders.length > 0) {
            totalExpense = orders.reduce((acc: any, next) => {
              if (next.statusOrder === StatusOrder.SUCCESS) {
                return acc + (next?.totalOrder ? next.totalOrder : 0);
              }
            }, 0);
          }

          return {
            _id: customer._id,
            fullName: customer.fullName,
            totalOrder: customer.orderIds.length,
            totalExpense,
          };
        });
    }

    return customers.length > 0
      ? {
          totalQuantityCustomerByGroupCustomerTypes,
          totalQuantityUsers,
          topCustomerBuyTheMostOrders: await Promise.all(topCustomerBuyTheMostOrders),
        }
      : {};
  }

  async orders(req: Request) {}
}

export default StatisticService;
