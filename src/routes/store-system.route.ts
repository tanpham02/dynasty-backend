import express from 'express';

import { FIELDS_NAME } from '@app/constants';
import { storeSystemController } from '@app/controllers';
import { formDataParser } from '@app/utils';

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
router.post('/', formDataParser(FIELDS_NAME.STORE_SYSTEM), storeSystemController.create);

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
router.patch('/:id', formDataParser(FIELDS_NAME.STORE_SYSTEM), storeSystemController.update);

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
router.get('/:id', storeSystemController.getById);

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
router.delete('/', storeSystemController.delete);

export default router;
