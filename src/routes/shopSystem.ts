import shopSystemController from '@app/controllers/storeSystem';
import express from 'express';
const router = express.Router();

/**
 * @swagger
 * '/api/shop-system/search':
 *  get:
 *     tags: [Shop System]
 *     summary: Search pagination
 *     parameters:
 *      - name: name
 *        in: query
 *        schema:
 *          type: string
 *      - name: cityId
 *        in: query
 *        schema:
 *          type: integer($int32)
 *      - name: districtId
 *        in: query
 *        schema:
 *          type: integer($int32)
 *      - name: wardId
 *        in: query
 *        schema:
 *          type: integer($int32)
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
 *                 $ref: '#/components/schema/Shop System'
 */

//SEARCH PAGINATION SHOP SYSTEM
router.get('/search', shopSystemController.search);

/**
 * @swagger
 * '/api/shop-system/create':
 *  post:
 *     tags: [Shop System]
 *     summary: Create shop system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Shop System'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Shop System'
 */

// CREATE SHOP SYSTEM
router.post('/create', shopSystemController.create);

/**
 * @swagger
 * '/api/shop-system/{id}':
 *  patch:
 *     tags: [Shop System]
 *     summary: Update shop system
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
 *             $ref: '#/components/schema/Shop System'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Shop System'
 */

// UPDATE SHOP SYSTEM
router.patch('/:id', shopSystemController.update);

/**
 * @swagger
 * '/api/shop-system/{id}':
 *  get:
 *     tags: [Shop System]
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
 *                 $ref: '#/components/schema/Shop System'
 */

// GET SHOP SYSTEM BY ID
router.get('/:id', shopSystemController.getById);

/**
 * @swagger
 * '/api/shop-system/':
 *  delete:
 *     tags: [Shop System]
 *     summary: Delete shop system
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
 *                 $ref: '#/components/schema/Shop System'
 */

// DELETE SHOP SYSTEM
router.delete('/', shopSystemController.delete);

export default router;
