import { Router } from 'express';
import { statisticController } from '@app/controllers/statistics';
const router = Router();

/**
 * @swagger
 * '/api/statistic/customer':
 *  get:
 *     tags: [Statistic]
 *     summary: Statistic customer
 *     parameters:
 *      - name: times
 *        in: query
 *        schema:
 *          type: string
 *          enum:
 *            - YEAR
 *            - MONTH
 *            - DAY
 *      - name: from
 *        in: query
 *        schema:
 *          type: string
 *      - name: to
 *        in: query
 *        schema:
 *          type: string
 *      - name: customerType
 *        in: query
 *        schema:
 *          type: string
 *          enum:
 *            - NEW
 *            - EXIST
 *            - POTENTIAL
 *            - BUY_THE_MOST_ORDERS

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Statistic'
 */

// CUSTOMER
router.get('/customer', statisticController.customers);

export default router;
