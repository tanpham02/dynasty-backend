import promotionController from '@app/controllers/promotions';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * '/api/promotions/search':
 *  get:
 *     tags: [Promotions]
 *     summary: Search pagination
 *     parameters:
 *      - name: name
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
 *                 $ref: '#/components/schema/Promotions'
 */
router.get('/search', promotionController.search);

/**
 * @swagger
 * '/api/promotions/create':
 *  post:
 *     tags: [Promotions]
 *     summary: Create promotions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Promotions'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Promotions'
 */
router.post('/create', promotionController.create);

/**
 * @swagger
 * '/api/promotions/{id}':
 *  patch:
 *     tags: [Promotions]
 *     summary: Update promotions
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Promotions'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Promotions'
 */

router.patch('/:id', promotionController.update);

/**
 * @swagger
 * '/api/promotions/{id}':
 *  get:
 *     tags: [Promotions]
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
 *                 $ref: '#/components/schema/Promotions'
 */
router.get('/:id', promotionController.getById);

/**
 * @swagger
 * '/api/promotions/':
 *  delete:
 *     tags: [Promotions]
 *     summary: Delete promotions
 *     parameters:
 *       - in: query
 *         name: ids
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
 *                 $ref: '#/components/schema/Promotions'
 */
router.delete('/', promotionController.delete);

export default router;
