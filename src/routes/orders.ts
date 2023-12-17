import orderController from '@app/controllers/orders';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * '/api/orders/search':
 *  get:
 *     tags: [Orders]
 *     summary: Search pagination
 *     parameters:
 *      - name: customerId
 *        in: query
 *        schema:
 *          type: string
 *      - name: from
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-05
 *      - name: to
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-05
 *      - name: statusOrder
 *        in: query
 *        schema:
 *          type: string
 *          enum:
 *              - PENDING
 *              - DELIVERING
 *              - FAIL
 *              - CANCELED
 *              - SUCCESS
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
 *                 $ref: '#/components/schema/Orders'
 */

// SEARCH PAGINATION CATEGORY
router.get('/search', orderController.searchPagination);

/**
 * @swagger
 * '/api/orders/{id}':
 *  get:
 *     tags: [Orders]
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
 * '/api/orders/checkout':
 *  post:
 *     tags: [Orders]
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
 * '/api/orders/quick-buy':
 *  post:
 *     tags: [Orders]
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
//router.post('/quick-buy', orderController.quickBuy);

/**
 * @swagger
 * '/api/orders/when-use-voucher':
 *  post:
 *     tags: [Orders]
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
// router.post('/when-use-voucher', orderController.updateTotalOrderWhenUseVoucher);

/**
 * @swagger
 * '/api/orders/re-order/{orderId}':
 *  post:
 *     tags: [Orders]
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
//outer.post('/re-order/:orderId', orderController.reorder);

/**
 * @swagger
 * '/api/orders/update-status-order':
 *  patch:
 *     tags: [Orders]
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
// router.patch('/update-status-order', orderController.updateStatusOrder);

/**
 * @swagger
 * '/api/orders/cancel-order':
 *  patch:
 *     tags: [Orders]
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
// router.patch('/cancel-order', orderController.requestCancelOrder);

export default router;
