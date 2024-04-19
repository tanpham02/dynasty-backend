import { FIELDS_NAME } from '@app/constants/app';
import { productAttributeController } from '@app/controllers';
import { formDataParser } from '@app/utils/form-data-parser.util';

import express from 'express';
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
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   productAttributeInfo:
 *                         $ref: '#/components/schemas/ProductAttribute'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ProductAttribute'
 */

// CREATE
router.post('/', formDataParser(FIELDS_NAME.PRODUCT_ATTRIBUTE), productAttributeController.create);

/**
 * @swagger
 * '/api/products/attributes/{id}':
 *  patch:
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
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   productAttributeInfo:
 *                         $ref: '#/components/schemas/ProductAttribute'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ProductAttribute'
 */

// UPDATE
router.patch(
  '/:id',
  formDataParser(FIELDS_NAME.PRODUCT_ATTRIBUTE),
  productAttributeController.update,
);

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
 *                 $ref: '#/components/schema/ProductAttribute'
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
 *                 $ref: '#/components/schema/ProductAttribute'
 */
// DELETE
router.delete('/', productAttributeController.delete);

export default router;
