/* eslint-disable no-case-declarations */
import { dbContext, OrderModel } from '@app/models';
import { OrderStatus, Params, Role } from '@app/types';

import {
  startOfWeek,
  endOfWeek,
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  differenceInDays,
  getWeek,
  getYear,
} from 'date-fns';

class OverviewService {
  OPERATING_FEE = 10_000_000;

  constructor() {}

  async getOverViewByCriterial(params: Params) {
    const fromDate = params.from;
    const toDate = params.to;

    const conditions: Record<string, any> = {
      createdAt: {
        $gte: new Date(fromDate as any),
        $lte: new Date(toDate as any),
      },
      orderStatus: OrderStatus.SUCCESS,
    };

    const orders = await dbContext.OrderModel.find(conditions);

    const totalRevenues = orders?.reduce((acc, next) => acc + (next?.total ?? 0), 0);
    const totalOrders = orders?.length;

    const totalOrderCancel = orders?.filter((order) => order.orderStatus === OrderStatus.CANCELED)
      ?.length;

    const percentCancelOrder = Number(totalOrderCancel / totalOrders).toFixed(2);

    return {
      totalOrders,
      totalRevenues,
      percentCancelOrder: Number(percentCancelOrder) || 0,
    };
  }

  async getRevenueChart(params: Params) {
    // Ngắn (dưới 30 ngày): Hiển thị dữ liệu theo từng ngày.
    // Vừa (1-3 tháng): Hiển thị dữ liệu theo tuần.
    // Dài (hơn 3 tháng): Hiển thị dữ liệu theo tháng.
    // Rất dài (hơn 1 năm): Hiển thị theo quý hoặc năm.
    const fromDate = params.from;
    const toDate = params.to;
    const groupType = params.groupType;

    // Số ngày trong tháng (Ví dụ: tháng 12 có 31 ngày)
    const totalDaysInMonth = 31;

    // Tạo mảng đầy đủ các ngày từ 1 đến 31

    const conditions: Record<string, any> = {
      createdAt: {
        $gte: new Date(fromDate as any),
        $lte: new Date(toDate as any),
      },
      orderStatus: 'SUCCESS',
    };

    let groupBy;
    let groupByFormat = '%Y-%m-%d'; // Mặc định là nhóm theo ngày
    if (groupType === 'TODAY') {
      groupBy = {
        _id: {
          $dateToString: {
            format: '%H', // Format to show hour in 24-hour format (0-23)
            date: '$createdAt',
            timezone: '+07:00', // Apply UTC+7 offset
          },
        }, // Group by hour (0-23)
        totalRevenue: { $sum: '$total' },
      };
    } else if (['LAST_MONTH', 'THIS_MONTH'].includes(groupType)) {
      groupBy = {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07:00' } }, // Group by date (YYYY-MM-DD)
        totalRevenue: { $sum: '$total' },
      };
    } else if (groupType === 'THIS_WEEK' || groupType === 'LAST_WEEK') {
      groupBy = {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d', // Format to group by date (YYYY-MM-DD)
            date: '$createdAt',
            timezone: '+07:00',
          },
        },
        totalRevenue: { $sum: '$total' }, // Sum total revenue per day
      };
    } else if (groupType === 'OTHER') {
      const diffInDays = Math.ceil(
        (new Date(toDate as any).getTime() - new Date(fromDate as any).getTime()) /
          (1000 * 60 * 60 * 24),
      ); // Số ngày giữa khoảng thời gian

      if (diffInDays > 30 && diffInDays <= 90) {
        groupByFormat = '%Y-%U'; // Nhóm theo tuần (năm và số tuần)
      } else if (diffInDays > 90 && diffInDays <= 365) {
        groupByFormat = '%Y-%m'; // Nhóm theo tháng (năm và tháng)
      } else if (diffInDays > 365) {
        groupByFormat = '%Y-Q%q'; // Nhóm theo quý (năm và quý)
      }

      groupBy = {
        _id: {
          $dateToString: {
            format: groupByFormat, // Định dạng nhóm
            date: '$createdAt',
            timezone: '+07:00', // Điều chỉnh múi giờ
          },
        },
        totalRevenue: { $sum: '$total' }, // Tổng doanh thu
      };
    }

    const results = await OrderModel.aggregate([
      {
        $match: conditions,
      },
      {
        $group: groupBy as any,
      },
      {
        $sort: { _id: 1 }, // Sort results by date (ascending)
      },
    ]);

    // Tạo mảng date và data
    const dateRange: any[] = [];
    const dataRange = [];

    // Nếu `groupType` là 'LAST_MONTH' hoặc 'THIS_MONTH', ta sẽ tạo dữ liệu theo các ngày trong tháng
    if (['LAST_MONTH', 'THIS_MONTH'].includes(groupType)) {
      const now = new Date();

      // Nếu là 'THIS_MONTH', lấy tháng hiện tại
      const month = groupType === 'THIS_MONTH' ? now.getMonth() : now.getMonth() - 1; // Nếu là tháng trước, trừ 1

      // Tính số ngày trong tháng
      const firstDayOfMonth = new Date(now.getFullYear(), month, 1);
      const lastDayOfMonth = new Date(now.getFullYear(), month + 1, 0); // Lấy ngày cuối của tháng
      const totalDaysInMonth = lastDayOfMonth.getDate(); // Lấy số ngày trong tháng

      // Tạo một mảng với các ngày trong tháng
      for (let day = 1; day <= totalDaysInMonth; day++) {
        dateRange.push(day.toString()); // Thêm ngày vào mảng date
        dataRange.push(0); // Gán giá trị ban đầu cho doanh thu (0)
      }

      // Cập nhật dữ liệu doanh thu cho các ngày trong tháng từ kết quả aggregation
      results.forEach((item) => {
        const day = item._id.split('-')[2]; // Lấy ngày từ _id (YYYY-MM-DD)
        const dayIndex = parseInt(day, 10) - 1; // Chuyển đổi ngày thành chỉ số mảng (0-indexed)
        const revenue = item.totalRevenue;

        dataRange[dayIndex] = revenue; // Cập nhật doanh thu cho ngày tương ứng
      });
    } else if (groupType === 'THIS_WEEK' || groupType === 'LAST_WEEK') {
      const fromDate = new Date(params?.from as any);
      const toDate = new Date(params?.to as any);

      // Tạo danh sách các ngày trong tuần
      for (
        let currentDate = new Date(fromDate);
        currentDate <= toDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        const dayString = currentDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
        dateRange.push(dayString);
        dataRange.push(0); // Khởi tạo doanh thu mặc định là 0
      }

      // Ánh xạ dữ liệu doanh thu từ kết quả aggregation
      results.forEach((item) => {
        const index = dateRange.findIndex((date) => date === item._id);
        if (index !== -1) {
          dataRange[index] = item.totalRevenue;
        }
      });

      // Kết quả cuối cùng
      return [
        {
          date: dateRange, // Từng ngày trong tuần
          data: dataRange, // Doanh thu tương ứng từng ngày
        },
      ];
    } else if (groupType === 'TODAY') {
      // Xử lý cho trường hợp group theo giờ trong ngày
      results.forEach((item) => {
        const hour = `${item._id}h`; // Định dạng theo giờ
        dateRange.push(hour);
        dataRange.push(item.totalRevenue);
      });
    } else if (groupType === 'OTHER') {
      if (groupByFormat === '%Y-%m-%d') {
        // Xử lý nhóm theo ngày
        for (
          let currentDate = new Date(fromDate as any);
          currentDate <= toDate!;
          currentDate.setDate(currentDate.getDate() + 1)
        ) {
          const dayString = currentDate.toISOString().split('T')[0];
          dateRange.push(dayString);
          dataRange.push(0); // Doanh thu mặc định
        }

        results.forEach((item) => {
          const index = dateRange.findIndex((date) => date === item._id);
          if (index !== -1) {
            dataRange[index] = item.totalRevenue;
          }
        });
      } else if (groupByFormat === '%Y-%U') {
        // Xử lý nhóm theo tuần
        results.forEach((item) => {
          dateRange.push(`Week ${item._id.split('-')[1]}, ${item._id.split('-')[0]}`);
          dataRange.push(item.totalRevenue);
        });
      } else if (groupByFormat === '%Y-%m') {
        // Xử lý nhóm theo tháng
        results.forEach((item) => {
          const [year, month] = item._id.split('-');
          dateRange.push(`${year}-${month}`);
          dataRange.push(item.totalRevenue);
        });
      } else if (groupByFormat === '%Y-Q%q') {
        // Xử lý nhóm theo quý
        results.forEach((item) => {
          dateRange.push(item._id); // '2024-Q1', '2024-Q2'...
          dataRange.push(item.totalRevenue);
        });
      }

      return [
        {
          date: dateRange,
          data: dataRange,
        },
      ];
    }

    return [{ date: dateRange, data: dataRange }];
  }

  async getProfitChart(params: Params) {
    // Ngắn (dưới 30 ngày): Hiển thị dữ liệu theo từng ngày.
    // Vừa (1-3 tháng): Hiển thị dữ liệu theo tuần.
    // Dài (hơn 3 tháng): Hiển thị dữ liệu theo tháng.
    // Rất dài (hơn 1 năm): Hiển thị theo quý hoặc năm.
    const fromDate = params.from;
    const toDate = params.to;
    const groupType = params.groupType;

    // Tạo mảng đầy đủ các ngày từ 1 đến 31

    const conditions: Record<string, any> = {
      createdAt: {
        $gte: new Date(fromDate as any),
        $lte: new Date(toDate as any),
      },
      orderStatus: 'SUCCESS',
    };

    let groupBy;
    let groupByFormat = '%Y-%m-%d'; // Mặc định là nhóm theo ngày
    if (['LAST_MONTH'].includes(groupType)) {
      groupBy = {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07:00' } }, // Group by date (YYYY-MM-DD)
        totalRevenue: { $sum: '$total' },
      };
    } else if (groupType === 'LAST_WEEK') {
      groupBy = {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d', // Format to group by date (YYYY-MM-DD)
            date: '$createdAt',
            timezone: '+07:00',
          },
        },
        totalRevenue: { $sum: '$total' }, // Sum total revenue per day
      };
    } else if (groupType === 'OTHER') {
      const diffInDays = Math.ceil(
        (new Date(toDate as any).getTime() - new Date(fromDate as any).getTime()) /
          (1000 * 60 * 60 * 24),
      ); // Số ngày giữa khoảng thời gian

      if (diffInDays > 30 && diffInDays <= 90) {
        groupByFormat = '%Y-%U'; // Nhóm theo tuần (năm và số tuần)
      } else if (diffInDays > 90 && diffInDays <= 365) {
        groupByFormat = '%Y-%m'; // Nhóm theo tháng (năm và tháng)
      } else if (diffInDays > 365) {
        groupByFormat = '%Y-Q%q'; // Nhóm theo quý (năm và quý)
      }

      groupBy = {
        _id: {
          $dateToString: {
            format: groupByFormat, // Định dạng nhóm
            date: '$createdAt',
            timezone: '+07:00', // Điều chỉnh múi giờ
          },
        },
        totalRevenue: { $sum: '$total' }, // Tổng doanh thu
      };
    }

    const results = await OrderModel.aggregate([
      {
        $match: conditions,
      },
      {
        $group: groupBy as any,
      },
      {
        $sort: { _id: 1 }, // Sort results by date (ascending)
      },
    ]);

    // Tạo mảng date và data
    const dateRange: any[] = [];
    const dataRange = [];

    // Nếu `groupType` là 'LAST_MONTH' hoặc 'THIS_MONTH', ta sẽ tạo dữ liệu theo các ngày trong tháng
    if (['LAST_MONTH'].includes(groupType)) {
      const now = new Date();

      // Nếu là 'THIS_MONTH', lấy tháng hiện tại
      const month = groupType === 'THIS_MONTH' ? now.getMonth() : now.getMonth() - 1; // Nếu là tháng trước, trừ 1

      // Tính số ngày trong tháng
      const firstDayOfMonth = new Date(now.getFullYear(), month, 1);
      const lastDayOfMonth = new Date(now.getFullYear(), month + 1, 0); // Lấy ngày cuối của tháng
      const totalDaysInMonth = lastDayOfMonth.getDate(); // Lấy số ngày trong tháng

      // Tạo một mảng với các ngày trong tháng
      for (let day = 1; day <= totalDaysInMonth; day++) {
        dateRange.push(day.toString()); // Thêm ngày vào mảng date
        dataRange.push(0); // Gán giá trị ban đầu cho doanh thu (0)
      }

      // Cập nhật dữ liệu doanh thu cho các ngày trong tháng từ kết quả aggregation
      results.forEach((item) => {
        const day = item._id.split('-')[2]; // Lấy ngày từ _id (YYYY-MM-DD)
        const dayIndex = parseInt(day, 10) - 1; // Chuyển đổi ngày thành chỉ số mảng (0-indexed)
        const revenue = item.totalRevenue;

        dataRange[dayIndex] = revenue; // Cập nhật doanh thu cho ngày tương ứng
      });
    } else if (groupType === 'LAST_WEEK') {
      const fromDate = new Date(params?.from as any);
      const toDate = new Date(params?.to as any);

      // Tạo danh sách các ngày trong tuần
      for (
        let currentDate = new Date(fromDate);
        currentDate <= toDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        const dayString = currentDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
        dateRange.push(dayString);
        dataRange.push(0); // Khởi tạo doanh thu mặc định là 0
      }

      // Ánh xạ dữ liệu doanh thu từ kết quả aggregation
      results.forEach((item) => {
        const index = dateRange.findIndex((date) => date === item._id);
        if (index !== -1) {
          dataRange[index] = item.totalRevenue;
        }
      });

      // Kết quả cuối cùng
      return [
        {
          date: dateRange, // Từng ngày trong tuần
          data: dataRange, // Doanh thu tương ứng từng ngày
        },
      ];
    } else if (groupType === 'OTHER') {
      if (groupByFormat === '%Y-%m-%d') {
        // Xử lý nhóm theo ngày
        for (
          let currentDate = new Date(fromDate as any);
          currentDate <= toDate!;
          currentDate.setDate(currentDate.getDate() + 1)
        ) {
          const dayString = currentDate.toISOString().split('T')[0];
          dateRange.push(dayString);
          dataRange.push(0); // Doanh thu mặc định
        }

        results.forEach((item) => {
          const index = dateRange.findIndex((date) => date === item._id);
          if (index !== -1) {
            dataRange[index] = item.totalRevenue;
          }
        });
      } else if (groupByFormat === '%Y-%U') {
        // Xử lý nhóm theo tuần
        results.forEach((item) => {
          dateRange.push(`Week ${item._id.split('-')[1]}, ${item._id.split('-')[0]}`);
          dataRange.push(item.totalRevenue);
        });
      } else if (groupByFormat === '%Y-%m') {
        // Xử lý nhóm theo tháng
        results.forEach((item) => {
          const [year, month] = item._id.split('-');
          dateRange.push(`${year}-${month}`);
          dataRange.push(item.totalRevenue);
        });
      } else if (groupByFormat === '%Y-Q%q') {
        // Xử lý nhóm theo quý
        results.forEach((item) => {
          dateRange.push(item._id); // '2024-Q1', '2024-Q2'...
          dataRange.push(item.totalRevenue);
        });
      }

      return [
        {
          date: dateRange,
          data: dataRange,
        },
      ];
    }

    return [{ date: dateRange, data: dataRange }];
  }

  async getFiveProductsBestSelling() {
    const conditions: Record<string, any> = {
      status: 'ACTIVE',
      totalOrder: {
        $gt: 0,
      },
    };

    const results = await dbContext.ProductModel.aggregate([
      {
        $match: conditions, // Optional: Filter only active products
      },
      {
        $project: {
          _id: 1,
          name: 1, // Include the product name
          totalOrder: 1, // Include the order quantity
          image: 1, // Include the product image (optional)
        },
      },
      {
        $sort: { totalOrder: -1 }, // Sort by totalOrder in descending order
      },
      {
        $limit: 5, // Limit to the top 5
      },
    ]);

    return results;
  }

  async calculateProfitByCriteria(params: Params) {
    const { from: fromDate, to: toDate } = params;

    const conditions: Record<string, any> = {
      createdAt: {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      },
    };

    const [ordersResult, ingredientsResult] = await Promise.all([
      dbContext.OrderModel.aggregate([
        { $match: conditions },
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d', // Format to group by date (YYYY-MM-DD)
                date: '$createdAt',
                timezone: '+07:00',
              },
            },
            totalRevenue: { $sum: '$total' },
          },
        },
      ]),
      dbContext.IngredientSnapshotModel.aggregate([
        {
          $match: conditions, // Điều kiện filter dữ liệu
        },
        {
          $project: {
            totalCost: { $multiply: ['$price', '$quantity'] }, // Tính tổng chi phí cho từng document
            createdAt: 1,
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$createdAt',
                timezone: '+07:00',
              },
            },
            totalIngredientsCost: { $sum: '$totalCost' }, // Tính tổng chi phí nguyên liệu
          },
        },
      ]),
    ]);

    const staffs = await dbContext.StaffModel?.find({
      role: { $ne: Role.ADMIN },
    })
      ?.populate(['salary'])
      ?.lean();

    const staffSalaries = staffs?.reduce((acc, next) => acc + next?.salary?.value, 0);

    return {
      ordersResult,
      ingredientsResult,
      staffSalaries,
    };
  }
}

export default OverviewService;
