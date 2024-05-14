import express from 'express';

import { productAttributeController } from '@app/controllers';

const router = express.Router();

/**
 * @swagger
 * '/api/products/attributes/search-all':
 *  get:
 *     tags: [Product Attributes]
 *     summary: Search all
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ProductAttribute'
 */

//SEARCH ALL
router.get('/search-all', productAttributeController.searchAll);

/**
 * @swagger
 * '/api/products/attributes':
 *  post:
 *     tags: [Product Attributes]
 *     summary: Create
 *     requestBody:
 *       content:
 *          application/json:
 *             schema:
 *                   $ref: '#/components/schemas/ProductAttribute'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ProductAttribute'
 */

// CREATE
router.post('/', productAttributeController.create);

/**
 * @swagger
 * '/api/products/attributes/{id}':
 *  put:
 *     tags: [Product Attributes]
 *     summary: Update
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
 *          application/json:
 *             schema:
 *                  $ref: '#/components/schemas/ProductAttribute'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ProductAttribute'
 */

// UPDATE
router.put('/:id', productAttributeController.update);

/**
 * @swagger
 * '/api/products/attributes/{id}':
 *  get:
 *     tags: [Product Attributes]
 *     summary: Find by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ProductAttribute'
 */

// GET BY ID
router.get('/:id', productAttributeController.getById);

/**
 * @swagger
 * '/api/products/attributes/':
 *  delete:
 *     tags: [Product Attributes]
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
 *                 $ref: '#/components/schemas/ProductAttribute'
 */
// DELETE
router.delete('/', productAttributeController.delete);

export default router;
