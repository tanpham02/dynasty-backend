import { Router } from 'express';
import { statisticController } from '@app/controllers/statistics';
const router = Router();

/**
 * @swagger
 * '/api/statistic/customers':
 *  get:
 *     tags: [Statistic]
 *     summary: Statistic customers
 *     parameters:
 *      - name: from
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *        description: 2023-12-23T00:00:00
 *      - name: to
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *        description: 2023-12-23T23:59:59

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Statistic'
 */

// CUSTOMERS
router.get('/customers', statisticController.customers);

/**
 * @swagger
 * '/api/statistic/orders':
 *  get:
 *     tags: [Statistic]
 *     summary: Statistic orders
 *     parameters:
 *      - name: from
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *        description: 2023-12-23T00:00:00
 *      - name: to
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *        description: 2023-12-23T23:59:59

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Statistic'
 */

// ORDERS
router.get('/orders', statisticController.customers);

export default router;
