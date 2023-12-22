import moment from 'moment';
import _ from 'lodash';
import CustomerModel from '@app/models/customers';
import CustomerService from '../customers';
import OrderService from '../orders';
import OrderModel from '@app/models/orders';
import { Request } from 'express';

const customerService = new CustomerService(CustomerModel, 'customer');
const orderService = new OrderService(OrderModel, 'order');

const statisticCustomersService = async (req: Request) => {
  const orders = await orderService.findAll();

  console.log('orders', orders);

  // Giả sử bạn có một mảng chứa thông tin đơn hàng
  //   const orders = [
  //     { customerId: '1', date: '2023-12-01', amount: 100 },
  //     { customerId: '2', date: '2023-12-05', amount: 150 },
  //     { customerId: '1', date: '2023-11-15', amount: 200 },
  //     // Thêm dữ liệu mẫu tương ứng với các khách hàng cũ, mới, tiềm năng
  //     // ...
  //   ];

  // Hàm để xác định nhóm của mỗi khách hàng dựa trên số lượng đơn đặt hàng
  //   function classifyCustomerGroup(orders: any) {
  //     const customerGroups: any = {};

  //     // Tính tổng số đơn đặt hàng của từng khách hàng
  //     const customerOrderCounts = _.countBy(orders, 'customerId');

  //     // Xác định nhóm của từng khách hàng
  //     _.forEach(customerOrderCounts, (orderCount: any, customerId: any) => {
  //       if (orderCount >= 5) {
  //         customerGroups[customerId] = 'BUY_THE_MOST_ORDER';
  //       } else if (moment().diff(moment(_.maxBy(orders, 'date').date), 'days') <= 30) {
  //         customerGroups[customerId] = 'tháng này';
  //       } else if (moment().diff(moment(_.maxBy(orders, 'date').date), 'days') <= 7) {
  //         customerGroups[customerId] = '7 ngày gần nhất';
  //       } else if (moment().diff(moment(_.maxBy(orders, 'date').date), 'months') <= 1) {
  //         customerGroups[customerId] = 'tháng trước';
  //       } else if (moment().diff(moment(_.maxBy(orders, 'date').date), 'months') <= 3) {
  //         customerGroups[customerId] = 'theo quý';
  //       } else {
  //         customerGroups[customerId] = 'theo năm';
  //       }
  //     });

  //     return customerGroups;
  //   }

  // Gọi hàm và in kết quả
  //   const customerGroups = classifyCustomerGroup(orders);
  //   console.log(customerGroups);
};

export default statisticCustomersService;
