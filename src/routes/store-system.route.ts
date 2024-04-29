import express from 'express';

import { storeSystemController } from '@app/controllers';
import { verifyToken } from '@app/middlewares';

const router = express.Router();

/**
 * @swagger
 * '/api/store-system/search':
 *  get:
 *     tags: [Store System]
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
 *      - $ref: '#/components/parameters/PageIndex'
 *      - $ref: '#/components/parameters/PageSize'
 *      - $ref: '#/components/parameters/SortBy'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/StoreSystem'
 */

//SEARCH PAGINATION
router.get('/search', storeSystemController.search);

/**
 * @swagger
 * '/api/store-system':
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Store System]
 *     summary: Create
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 $ref: '#/components/schemas/StoreSystem'

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/StoreSystem'
 */

// CREATE
router.post('/', verifyToken, storeSystemController.create);

/**
 * @swagger
 * '/api/store-system/{id}':
 *  patch:
 *     security:
 *       - bearerAuth: []
 *     tags: [Store System]
 *     summary: Update
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 $ref: '#/components/schemas/StoreSystem'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/StoreSystem'
 */

// UPDATE
router.patch('/:id', verifyToken, storeSystemController.update);

/**
 * @swagger
 * '/api/store-system/{id}':
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Store System]
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
 *                 $ref: '#/components/schemas/StoreSystem'
 */

// GET  BY ID
router.get('/:id', verifyToken, storeSystemController.getById);

/**
 * @swagger
 * '/api/store-system/':
 *  delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Store System]
 *     summary: Delete
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
 *                 $ref: '#/components/schemas/StoreSystem'
 */

// DELETE
router.delete('/', verifyToken, storeSystemController.delete);

export default router;
