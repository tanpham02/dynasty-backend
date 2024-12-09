import { Router } from 'express';

import { OverViewController } from '@app/controllers';

const router = Router();

/**
 * @swagger
 * '/api/overviews/overview':
 *  get:
 *     tags: [Overviews]
 *     summary: Get overviews
 *     parameters:
 *      - name: rawOffset
 *        in: query
 *        schema:
 *          type: string
 *        description: VD +7
 *      - name: from
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-05 00:00:00
 *      - name: to
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-05 23:59:00
 *     responses:
 *       200:
 *         description: OK
 */

// GET OVERVIEWS
router.get('/overview', OverViewController.getOverview);

/**
 * @swagger
 * '/api/overviews/revenue-chart':
 *  get:
 *     tags: [Overviews]
 *     summary: Get overviews
 *     parameters:
 *      - name: rawOffset
 *        in: query
 *        schema:
 *          type: string
 *        description: VD +7
 *      - name: from
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-05 00:00:00
 *      - name: to
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-05 23:59:00
 *     responses:
 *       200:
 *         description: OK
 */

router.get('/revenue-chart', OverViewController.getRevenueChart);

/**
 * @swagger
 * '/api/overviews/top-best-selling':
 *  get:
 *     tags: [Overviews]
 *     summary: Get overviews
 *     parameters:
 *      - name: rawOffset
 *        in: query
 *        schema:
 *          type: string
 *        description: VD +7
 *      - name: from
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-05 00:00:00
 *      - name: to
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-05 23:59:00
 *     responses:
 *       200:
 *         description: OK
 */

router.get('/top-best-selling', OverViewController.getFiveProductsBestSelling);

export default router;
