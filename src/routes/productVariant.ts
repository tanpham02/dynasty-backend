import productVariantController from '@app/controllers/productVariant';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * '/api/product-variant/search':
 *  get:
 *     tags: [Product Variant]
 *     summary: Search pagination
 *     parameters:
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
 *                 $ref: '#/components/schema/ProductVariant'
 */

// SEARCH PAGINATION
router.get('/search', productVariantController.search);

/**
 * @swagger
 * '/api/product-variant/create':
 *  post:
 *     tags: [Product Variant]
 *     summary: Create product variant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/ProductVariant'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ProductVariant'
 */

// CREATE PRODUCT VARIANT
router.post('/create', productVariantController.create);

/**
 * @swagger
 * '/api/product-variant/{id}':
 *  patch:
 *     tags: [Product Variant]
 *     summary: Update product variant
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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/ProductVariant'
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ProductVariant'
 */

// UPDATE PRODUCT VARIANT
router.patch('/:id', productVariantController.update);

/**
 * @swagger
 * '/api/product-variant/{id}':
 *  get:
 *     tags: [Product Variant]
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
 *                 $ref: '#/components/schema/ProductVariant'
 */

// GET PRODUCT VARIANT BY ID
router.get('/:id', productVariantController.getById);

/**
 * @swagger
 * '/api/product-variant/':
 *  delete:
 *     tags: [Product Variant]
 *     summary: Delete product variant
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
 *                 $ref: '#/components/schema/ProductVariant'
 */
// DELETE PRODUCT VARIANT
router.delete('/', productVariantController.delete);

export default router;
