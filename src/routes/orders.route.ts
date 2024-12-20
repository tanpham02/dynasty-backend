import { Router } from 'express';

import { FIELDS_NAME } from '@app/constants';
import { orderController } from '@app/controllers';
import { formDataParser } from '@app/utils';

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
 *        description: VD 2023-10-05 00:00:00
 *      - name: to
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-05 23:59:00
 *      - name: statusOrder
 *        in: query
 *        schema:
 *          type: string
 *          enum:
 *              - PENDING
 *              - DELIVERING
 *              - CANCELED
 *              - SUCCESS
 *              - WAITING_FOR_DELIVERING
 *              - WAITING_FOR_PAYMENT
 *      - $ref: '#/components/parameters/PageIndex'
 *      - $ref: '#/components/parameters/PageSize'
 *      - $ref: '#/components/parameters/SortBy'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Orders'
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
 *                 $ref: '#/components/schemas/Orders'
 */

// GET BY ID
router.get('/:id', orderController.getById as any);

/**
 * @swagger
 * '/api/orders/checkout':
 *  post:
 *     tags: [Orders]
 *     summary: Checkout
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Orders'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Orders'
 */

// CHECKOUT
router.post('/checkout', orderController.checkout);

/**
 * @swagger
 * '/api/orders/re-order':
 *  post:
 *     tags: [Orders]
 *     summary: Re-order
 *     parameters:
 *      - name: orderId
 *        in: query
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
 *                 $ref: '#/components/schemas/Orders'
 */

// RE-ORDER
router.post('/re-order', orderController.reorder);

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
 *      - name: orderStatus
 *        in: query
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Orders'
 */

// UPDATE STATUS ORDER
router.patch('/update-status-order', orderController.updateStatusOrder);

/**
 * @swagger
 * '/api/orders/cancel-order':
 *  patch:
 *     tags: [Orders]
 *     summary: Cancel order
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
 *                 $ref: '#/components/schemas/Orders'
 */

// CANCEL ORDER
router.patch('/cancel-order', orderController.requestCancelOrder);

/**
 * @swagger
 * '/api/orders/{id}':
 *  delete:
 *     tags: [Orders]
 *     summary: Delete
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
 *                 $ref: '#/components/schemas/Orders'
 */

// DELETE ORDER
router.delete('/:id', orderController.deleteOrder);

export default router;
