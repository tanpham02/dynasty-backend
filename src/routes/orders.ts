import { FIELDS_NAME } from '@app/constants';
import orderController from '@app/controllers/orders';
import { formDataParser } from '@app/middlewares/formDataParser';
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
 *                 $ref: '#/components/schema/Orders'
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
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   orderInfo:
 *                        $ref: '#/components/schemas/Orders'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Orders'
 */

// CHECKOUT
router.post('/checkout', formDataParser(FIELDS_NAME.ORDER), orderController.checkout);

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
 *                 $ref: '#/components/schema/Orders'
 */

// RE-ORDER
router.post('/re-order/:orderId', orderController.reorder);

/**
 * @swagger
 * '/api/orders/update-status-order/{orderId}':
 *  patch:
 *     tags: [Orders]
 *     summary: Update status order
 *     parameters:
 *      - name: orderId
 *        in: path
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
 *                 $ref: '#/components/schema/Orders'
 */

// UPDATE STATUS ORDER
router.patch('/update-status-order/:orderId', orderController.updateStatusOrder);

/**
 * @swagger
 * '/api/orders/cancel-order/{orderId}':
 *  patch:
 *     tags: [Orders]
 *     summary: Request
 *     parameters:
 *      - name: orderId
 *        in: path
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
 *                 $ref: '#/components/schema/Orders'
 */

// CANCEL ORDER
router.patch('/cancel-order/:orderId', orderController.requestCancelOrder);

/**
 * @swagger
 * '/api/orders/{id}':
 *  patch:
 *     tags: [Orders]
 *     summary: Delete
 *     parameters:
 *      - name: id
 *        in: path
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
 *                 $ref: '#/components/schema/Orders'
 */

// DELETE ORDER
router.delete('/:id', orderController.deleteOrder);

export default router;
