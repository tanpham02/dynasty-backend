import { dbContext } from '@app/models';
import { OrderStatus, Params } from '@app/types';
import { getDateByRawOffset, YYYY_MM_DDTHH_MM_SS } from '@app/utils';

class OverviewService {
  HUMAN_RESOURCES_FEE = 0;
  OPERATING_FEE = 0;

  constructor() {}

  async getOverViewByCriterial(params: Params) {
    const fromDate = params.from;
    const toDate = params.to;
    const rawOffset = Number(params?.rawOffset ?? '+7');

    const adjustedFromDate = getDateByRawOffset(fromDate, rawOffset).format(YYYY_MM_DDTHH_MM_SS);
    const adjustedToDate = getDateByRawOffset(toDate, rawOffset).format(YYYY_MM_DDTHH_MM_SS);

    const conditions: Record<string, any> = {
      createdAt: {
        $gte: adjustedFromDate,
        $lt: adjustedToDate,
      },
    };

    const orders = await dbContext.OrderModel.find(conditions);
    const ingredientsSnapshots = await dbContext.IngredientSnapshotModel.find(conditions);

    const totalOrders = orders?.length;
    const totalRevenues = orders?.reduce((acc, next) => acc + (next?.total ?? 0), 0);
    const ingredientsSnapshotsTotal = ingredientsSnapshots?.reduce(
      (acc, next) => acc + (next?.quantity ?? 0) * (next?.price ?? 0),
      0,
    );
    const netRevenueTotal =
      totalRevenues - (this.HUMAN_RESOURCES_FEE + this.OPERATING_FEE + ingredientsSnapshotsTotal);

    const totalOrderCancel = orders?.filter(
      (order) => order.orderStatus === OrderStatus.CANCELED,
    )?.length;

    const percentCancelOrder = Number(totalOrderCancel / totalOrders).toFixed(2);

    return {
      totalOrders,
      totalRevenues,
      netRevenueTotal,
      percentCancelOrder: Number(percentCancelOrder) || 0,
    };
  }

  async getRevenueChart(params: Params) {
    const fromDate = params.from;
    const toDate = params.to;
    const rawOffset = Number(params?.rawOffset ?? '+7');

    const adjustedFromDate = getDateByRawOffset(fromDate, rawOffset).format(YYYY_MM_DDTHH_MM_SS);
    const adjustedToDate = getDateByRawOffset(toDate, rawOffset).format(YYYY_MM_DDTHH_MM_SS);

    const conditions: Record<string, any> = {
      createdAt: {
        $gte: adjustedFromDate,
        $lte: adjustedToDate,
      },
    };

    const results = await dbContext.OrderModel.aggregate([
      {
        $match: conditions,
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, // Group by date (YYYY-MM-DD)
          count: { $sum: 1 }, // Count the number of documents per date
          items: { $push: '$$ROOT' }, // Include all documents in the group
        },
      },
      {
        $sort: { _id: 1 }, // Sort results by date (ascending)
      },
    ]);

    return results?.map((item) => {
      const date = [];
      const data = [];

      date.push(item._id);
      data.push(item.count);

      return { date, data };
    });
  }

  async getFiveProductsBestSelling(params: Params) {
    const fromDate = params.from;
    const toDate = params.to;
    const rawOffset = Number(params?.rawOffset ?? '+7');

    const adjustedFromDate = getDateByRawOffset(fromDate, rawOffset).format(YYYY_MM_DDTHH_MM_SS);
    const adjustedToDate = getDateByRawOffset(toDate, rawOffset).format(YYYY_MM_DDTHH_MM_SS);

    const conditions: Record<string, any> = {
      createdAt: {
        $gte: adjustedFromDate,
        $lte: adjustedToDate,
      },
      status: 'ACTIVE',
    };

    const results = await dbContext.ProductModel.aggregate([
      {
        $match: conditions, // Optional: Filter only active products
      },
      {
        $project: {
          _id: 1,
          name: 1, // Include the product name
          orderQuantity: 1, // Include the order quantity
          image: 1, // Include the product image (optional)
        },
      },
      {
        $sort: { orderQuantity: -1 }, // Sort by orderQuantity in descending order
      },
      {
        $limit: 5, // Limit to the top 5
      },
    ]);

    return results;
  }
}

export default OverviewService;
