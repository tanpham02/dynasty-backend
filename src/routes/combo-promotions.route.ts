import { Router } from 'express';

import { comboPromotionsController } from '@app/controllers';

const router = Router();

/**
 * @swagger
 * '/api/combo-promotions/search':
 *  get:
 *     tags: [Combo Promotions]
 *     summary: Search pagination
 *     parameters:
 *      - name: name
 *        in: query
 *        schema:
 *          type: string
 *      - name: categoryId
 *        in: query
 *        schema:
 *          type: string
 *      - $ref: '#/components/parameters/PageIndex'
 *      - $ref: '#/components/parameters/PageSize'
 *      - $ref: '#/components/parameters/SortBy'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ComboPromotions'
 */

router.get('/search', comboPromotionsController.search);

/**
 * @swagger
 * '/api/combo-promotions/create':
 *  post:
 *     tags: [Combo Promotions]
 *     summary: Create combo promotions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/ComboPromotions'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ComboPromotions'
 */
router.post('/create', comboPromotionsController.create);

/**
 * @swagger
 * '/api/combo-promotions/{id}':
 *  patch:
 *     tags: [Combo Promotions]
 *     summary: Update combo promotions
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/ComboPromotions'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ComboPromotions'
 */
router.patch('/:id', comboPromotionsController.update);

/**
 * @swagger
 * '/api/combo-promotions/{id}':
 *  get:
 *     tags: [Combo Promotions]
 *     summary: Get by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ComboPromotions'
 */
router.get('/:id', comboPromotionsController.getById);

/**
 * @swagger
 * '/api/combo-promotions/':
 *  delete:
 *     tags: [Combo Promotions]
 *     summary: Delete combo promotion
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ComboPromotions'
 */
router.delete('/', comboPromotionsController.delete);

export default router;
