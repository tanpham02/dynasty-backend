import cartController from '@app/controllers/cart';
import { Router } from 'express';
const router = Router();

/**
 * @swagger
 * '/api/carts/{customerId}':
 *  post:
 *     tags: [Cart]
 *     summary: Add cart
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
 *                 $ref: '#/components/schema/Cart'
 */

// ADD CART
router.post('/:customerId', cartController.addCart);

/**
 * @swagger
 * '/api/carts/{customerId}':
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
 *             $ref: '#/components/schemas/CartDTO'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Cart'
 */

// UPDATE CART
router.patch('/:customerId', cartController.updateCart);

/**
 * @swagger
 * '/api/carts/{customerId}':
 *  delete:
 *     tags: [Cart]
 *     summary: Delete cart
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: productIds
 *         schema:
 *           type: array
 *           item: string
 *         required: true

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Cart'
 */

// DELETE CART
router.delete('/:customerId', cartController.deleteCart);

/**
 * @swagger
 * '/api/carts/{customerId}':
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
router.get('/:customerId', cartController.getCartById);
export default router;
