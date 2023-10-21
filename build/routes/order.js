"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = __importDefault(require("@app/controllers/order"));
var express_1 = require("express");
var router = (0, express_1.Router)();
/**
 * @swagger
 * '/api/order/search':
 *  get:
 *     tags: [Order]
 *     summary: Search pagination
 *     parameters:
 *      - name: customerId
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
router.get('/search', order_1.default.searchPagination);
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
router.get('/:id', order_1.default.getById);
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
router.post('/checkout', order_1.default.checkout);
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
router.post('/quick-buy', order_1.default.quickBuy);
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
router.post('/when-use-voucher', order_1.default.updateTotalOrderWhenUseVoucher);
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
router.post('/re-order/:orderId', order_1.default.reorder);
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
router.patch('/update-status-order', order_1.default.updateStatusOrder);
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
router.patch('/cancel-order', order_1.default.requestCancelOrder);
exports.default = router;
