import { Router } from 'express';

import { cartController } from '@app/controllers';
const router = Router();

/**
 * @swagger
 * '/api/carts/{customerId}':
 *  patch:
 *     security:
 *       - bearerAuth: []
 *     tags: [Carts]
 *     summary: Add or update cart item
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
 *             $ref: '#/components/schemas/CartDTO'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Carts'
 */

// ADD TO CART
router.patch('/:customerId', cartController.addOrUpdateCartItem);

/**
 * @swagger
 * '/api/carts/':
 *  delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Carts]
 *     summary: Delete cart
 *     parameters:
 *       - in: query
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: cartItemId
 *         schema:
 *           type: string
 *         required: true

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Carts'
 */

// DELETE CART
router.delete('/', cartController.deleteCart);

/**
 * @swagger
 * '/api/carts/{customerId}':
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Carts]
 *     summary: Get cart by customerId
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Carts'
 */

// GET CART BY ID
router.get('/:customerId', cartController.getCartById);
export default router;
