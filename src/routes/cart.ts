import cartController from '@app/controllers/cart';

import { Router } from 'express';

const router = Router();
/**
 * @swagger
 * '/api/cart/add-cart':
 *  patch:
 *     tags: [Cart]
 *     summary: Add cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Cart'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Cart'
 */

// SEARCH PAGINATION
router.patch('/add-cart', cartController.addCart);

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

// SEARCH PAGINATION
router.get('/get-cart/:customerId', cartController.getCartById);
export default router;
