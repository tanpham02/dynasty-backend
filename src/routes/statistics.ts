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
 *      - name: from
 *        in: query
 *        schema:
 *          type: string
 *        description: 2023-12-23T00:00:00
 *      - name: to
 *        in: query
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

// CUSTOMER
router.get('/customer', statisticController.customers);

export default router;
