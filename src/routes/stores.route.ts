import { FIELDS_NAME } from '@app/constants/app';
import { storeController } from '@app/controllers';
import { formDataParser } from '@app/utils/form-data-parser.util';
import express from 'express';
const router = express.Router();

/**
 * @swagger
 * '/api/stores':
 *  get:
 *     tags: [Stores]
 *     summary: Get store config
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Stores'
 */

//SEARCH ALL
router.get('/', storeController.getStoreConfig);

/**
 * @swagger
 * '/api/stores':
 *  post:
 *     tags: [Stores]
 *     summary: Create
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/Stores'

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Stores'
 */

// CREATE
router.post('/', storeController.create);

/**
 * @swagger
 * '/api/stores/{id}':
 *  patch:
 *     tags: [Stores]
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
 *                $ref: '#/components/schemas/Stores'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Stores'
 */

// UPDATE
router.patch('/:id', storeController.update);

/**
 * @swagger
 * '/api/stores/':
 *  delete:
 *     tags: [Stores]
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
 *                 $ref: '#/components/schemas/Stores'
 */

// DELETE
router.delete('/', storeController.delete);

export default router;
