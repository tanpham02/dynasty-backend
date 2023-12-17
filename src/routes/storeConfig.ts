import { FIELDS_NAME } from '@app/constants';
import storeConfigController from '@app/controllers/storeConfig';
import { formDataParser } from '@app/middlewares/formDataParser';
import express from 'express';
const router = express.Router();

/**
 * @swagger
 * '/api/store-config/search-all':
 *  get:
 *     tags: [Store Config]
 *     summary: Search all
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Store Config'
 */

//SEARCH ALL
router.get('/search-all', storeConfigController.searchAll);

/**
 * @swagger
 * '/api/store-config':
 *  post:
 *     tags: [Store Config]
 *     summary: Create
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   storeConfigInfo:
 *                        $ref: '#/components/schema/Store Config'

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Store Config'
 */

// CREATE
router.post('/', formDataParser(FIELDS_NAME.STORE_CONFIG), storeConfigController.create);

/**
 * @swagger
 * '/api/store-config/{id}':
 *  patch:
 *     tags: [Store Config]
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
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   storeConfigInfo:
 *                        $ref: '#/components/schema/Store Config'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Store Config'
 */

// UPDATE
router.patch('/:id', formDataParser(FIELDS_NAME.STORE_CONFIG), storeConfigController.update);

/**
 * @swagger
 * '/api/store-config/{id}':
 *  get:
 *     tags: [Store Config]
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
 *                 $ref: '#/components/schema/Store Config'
 */

// GET  BY ID
router.get('/:id', storeConfigController.getById);

/**
 * @swagger
 * '/api/store-config/':
 *  delete:
 *     tags: [Store Config]
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
 *                 $ref: '#/components/schema/Store Config'
 */

// DELETE
router.delete('/', storeConfigController.delete);

export default router;
