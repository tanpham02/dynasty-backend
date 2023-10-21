"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cart_1 = __importDefault(require("@app/controllers/cart"));
var express_1 = require("express");
var router = (0, express_1.Router)();
/**
 * @swagger
 * '/api/cart/update-cart/{customerId}':
 *  patch:
 *     tags: [Cart]
 *     summary: Update cart
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/CartRequest'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Cart'
 */
// UPDATE CART
router.patch('/update-cart/:customerId', cart_1.default.updateCart);
/**
 * @swagger
 * '/api/cart/get-cart/{customerId}':
 *  get:
 *     tags: [Cart]
 *     summary: Get cart by customerId
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Cart'
 */
// GET CART BY ID
router.get('/get-cart/:customerId', cart_1.default.getCartById);
exports.default = router;
