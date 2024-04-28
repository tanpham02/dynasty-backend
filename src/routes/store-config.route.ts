import express from 'express';

import { storeConfigController } from '@app/controllers';

const router = express.Router();

/**
 * @swagger
 * '/api/store-config':
 *  get:
 *     tags: [Store Config]
 *     summary: Get store config
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/StoreConfig'
 */

//SEARCH ALL
router.get('/', storeConfigController.getStoreConfig);

/**
 * @swagger
 * '/api/store-config/{id}':
 *  patch:
 *     security:
 *       - bearerAuth: []
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
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/StoreConfig'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/StoreConfig'
 */

// UPDATE
router.patch('/:id', storeConfigController.update);

/**
 * @swagger
 * '/api/store-config/':
 *  delete:
 *     security:
 *       - bearerAuth: []
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
 *                 $ref: '#/components/schemas/StoreConfig'
 */

// DELETE
router.delete('/', storeConfigController.delete);

export default router;
