import { dbContext } from '@app/models';

class OverviewService {
  constructor() {}

  async getOverViewByCriterial() {
    const totalOrders = await dbContext.OrderModel.count();

    return {
      totalOrders,
    };
  }
}

export default OverviewService;
