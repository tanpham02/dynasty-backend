import express from 'express';

import { formDataParser } from '@app/utils';
import { productVariantController } from '@app/controllers';
import { FIELDS_NAME } from '@app/constants';

const router = express.Router();

/**
 * @swagger
 * '/api/products/variants/search':
 *  get:
 *     tags: [Product Variants]
 *     summary: Search pagination
 *     parameters:
 *      - name: name
 *        in: query
 *        schema:
 *          type: string
 *      - name: parentId
 *        in: query
 *        schema:
 *          type: string
 *      - name: types
 *        in: query
 *        schema:
 *           type: array
 *           items:
 *              type: string
 *              enum: [NORMAL, NEW, BEST_SELLER, DELICIOUS_MUST_TRY, VEGETARIAN, SPICY, UNIQUE]
 *      - $ref: '#/components/parameters/PageIndex'
 *      - $ref: '#/components/parameters/PageSize'
 *      - $ref: '#/components/parameters/SortBy'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ProductVariant'
 */

//SEARCH PAGINATION
router.get('/search', productVariantController.searchAll);

/**
 * @swagger
 * '/api/products/variants':
 *  post:
 *     tags: [Product Variants]
 *     summary: Create
 *     requestBody:
 *       content:
 *          application/json:
 *             schema:
 *                  $ref: '#/components/schemas/ProductVariant'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ProductVariant'
 */

// CREATE
router.post('/', productVariantController.create);

/**
 * @swagger
 * '/api/products/variants/{id}':
 *  patch:
 *     tags: [Product Variants]
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
 *                   $ref: '#/components/schemas/ProductVariant'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ProductVariant'
 */

// UPDATE
router.patch('/:id', productVariantController.update);

/**
 * @swagger
 * '/api/products/variants/{id}':
 *  get:
 *     tags: [Product Variants]
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
 *                 $ref: '#/components/schemas/ProductVariant'
 */

// GET BY ID
router.get('/:id', productVariantController.getById);

/**
 * @swagger
 * '/api/products/variants/':
 *  delete:
 *     tags: [Product Variants]
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
 *                 $ref: '#/components/schemas/ProductVariant'
 */
// DELETE
router.delete('/', productVariantController.delete);

export default router;
