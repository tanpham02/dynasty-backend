import cartController from '@app/controllers/carts.controller';
import { Router } from 'express';
const router = Router();

/**
 * @swagger
 * '/api/carts/{customerId}':
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Carts]
 *     summary: Add to cart
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

// ADD CART
router.post('/:customerId', cartController.addCart);

/**
 * @swagger
 * '/api/carts/{customerId}':
 *  patch:
 *     security:
 *       - bearerAuth: []
 *     tags: [Carts]
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
 *             $ref: '#/components/schemas/CartDTO'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Carts'
 */

// UPDATE CART
router.patch('/:customerId', cartController.updateCart);

/**
 * @swagger
 * '/api/carts/{customerId}':
 *  delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Carts]
 *     summary: Delete cart
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: productId
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
router.delete('/:customerId', cartController.deleteCart);

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
