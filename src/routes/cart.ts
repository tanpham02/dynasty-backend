import cartController from '@app/controllers/cart';

import { Router } from 'express';

const router = Router();
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
router.patch('/update-cart/:customerId', cartController.updateCart);

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
router.get('/get-cart/:customerId', cartController.getCartById);
export default router;
