// SCHEMAS RESPONSE

/**
 * @swagger
 * components:
 *   schema:
 *     Statistic:
 *       type: object
 *       properties:
 *         totalQuantityCustomerByGroupCustomerType:
 *             type: any
 *         dataListByFilter:
 *             type: any
 */

interface StatisticModel {
  totalQuantityCustomerByGroupCustomerType?: {
    [key: string]: number;
  };
  dataListByFilter: {
    [key: string]: any;
  };
}

export { StatisticModel };
