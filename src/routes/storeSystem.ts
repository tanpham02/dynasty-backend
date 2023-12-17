import { FIELDS_NAME } from '@app/constants';
import storeSystemController from '@app/controllers/storeSystem';
import { formDataParser } from '@app/middlewares/formDataParser';
import express from 'express';
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
 *                 $ref: '#/components/schema/Store System'
 */

//SEARCH PAGINATION
router.get('/search', storeSystemController.search);

/**
 * @swagger
 * '/api/store-system':
 *  post:
 *     tags: [Store System]
 *     summary: Create
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   storeSystemInfo:
 *                        $ref: '#/components/schema/Store System'

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Store System'
 */

// CREATE
router.post('/', formDataParser(FIELDS_NAME.STORE_SYSTEM), storeSystemController.create);

/**
 * @swagger
 * '/api/store-system/{id}':
 *  patch:
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
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   storeSystemInfo:
 *                        $ref: '#/components/schema/Store System'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Store System'
 */

// UPDATE
router.patch('/:id', formDataParser(FIELDS_NAME.STORE_SYSTEM), storeSystemController.update);

/**
 * @swagger
 * '/api/store-system/{id}':
 *  get:
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
 *                 $ref: '#/components/schema/Store System'
 */

// GET  BY ID
router.get('/:id', storeSystemController.getById);

/**
 * @swagger
 * '/api/store-system/':
 *  delete:
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
 *                 $ref: '#/components/schema/Store System'
 */

// DELETE
router.delete('/', storeSystemController.delete);

export default router;
