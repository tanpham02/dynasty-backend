import { Router } from 'express';
const router = Router();

/**
 * @swagger
 * '/api/statistic-customer/search':
 *  get:
 *     tags: [Statistic]
 *     summary: Statistic customer
 *     parameters:
 *      - name: times
 *        in: query
 *        schema:
 *          type: string
 *          enum:
 *            - NEW
 *            - EXIST
 *            - POTENTIAL
 *            - BUY_THE_MOST_ORDERS
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
 *                 type: string
 */

export default router;
