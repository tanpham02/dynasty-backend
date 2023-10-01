import orderController from '@app/controllers/order';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * '/api/order/search':
 *  get:
 *     tags: [Order]
 *     summary: Search pagination
 *     parameters:
 *      - name: sortByField
 *        in: query
 *        schema:
 *          type: string
 *      - name: pageIndex
 *        in: query
 *        schema:
 *          type: integer($int32)
 *      - name: pageSize
 *        in: query
 *        schema:
 *          type: integer($int32)
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Order'
 */

// SEARCH PAGINATION CATEGORY
router.get('/search', orderController.searchPagination);

/**
 * @swagger
 * '/api/order/{id}':
 *  get:
 *     tags: [Order]
 *     summary: Get by id
 *     parameters:
 *      - name: id
 *        in: path
 *        schema:
 *          type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Order'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Order'
 */

// VERIFY INFORMATION ORDER
router.post('/:id', orderController.getById);

/**
 * @swagger
 * '/api/order/checkout':
 *  post:
 *     tags: [Order]
 *     summary: Checkout
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Order'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Order'
 */

// CHECKOUT
router.post('/checkout', orderController.checkout);

/**
 * @swagger
 * '/api/order/update-status-order':
 *  patch:
 *     tags: [Order]
 *     summary: Update status order
 *     parameters:
 *      - name: orderId
 *        in: query
 *        schema:
 *          type: string
 *      - name: statusOrderRequest
 *        in: query
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Order'
 */

// UPDATE STATUS ORDER
router.patch('/update-status-order', orderController.updateStatusOrder);

export default router;
