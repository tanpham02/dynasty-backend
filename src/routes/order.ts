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
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Order'
 */

// GET BY ID
router.get('/:id', orderController.getById);

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
 * '/api/order/quick-buy':
 *  post:
 *     tags: [Order]
 *     summary: Quick buy
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

// QUICK BUY
router.post('/quick-buy', orderController.quickBuy);

/**
 * @swagger
 * '/api/order/when-use-voucher':
 *  post:
 *     tags: [Order]
 *     summary: Update total order when use voucher
 *     parameters:
 *      - name: voucherId
 *        in: query
 *        schema:
 *          type: string
 *      - name: customerId
 *        in: query
 *        schema:
 *          type: string
 *      - name: orderId
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
// UPDATE TOTAL ORDER WHEN USE VOUCHER
router.post('/when-use-voucher/:voucherId', orderController.updateTotalOrderWhenUseVoucher);

/**
 * @swagger
 * '/api/order/re-order/{orderId}':
 *  post:
 *     tags: [Order]
 *     summary: Re-order
 *     parameters:
 *      - name: orderId
 *        in: path
 *        schema:
 *          type: string
 *      - name: customerId
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

// RE-ORDER
router.post('/re-order/:orderId', orderController.reorder);

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

/**
 * @swagger
 * '/api/order/cancel-order':
 *  patch:
 *     tags: [Order]
 *     summary: Request
 *     parameters:
 *      - name: orderId
 *        in: query
 *        schema:
 *          type: string
 *      - name: reason
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

// CANCEL ORDER
router.patch('/cancel-order', orderController.requestCancelOrder);

export default router;
