import { productController } from '@app/controllers';
import { uploadFile } from '@app/middlewares';

import express from 'express';
const router = express.Router();

/**
 * @swagger
 * '/api/products/search':
 *  get:
 *     tags: [Products]
 *     summary: Search pagination
 *     parameters:
 *      - name: name
 *        in: query
 *        schema:
 *          type: string
 *      - name: categoryId
 *        in: query
 *        schema:
 *          type: string
 *      - name: childrenCategoryIds
 *        in: query
 *        schema:
 *          type: array
 *          items:
 *              type: string
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
 *                 $ref: '#/components/schemas/Products'
 */

//SEARCH PAGINATION PRODUCT
router.get('/search', productController.search);

/**
 * @swagger
 * '/api/products':
 *  post:
 *     tags: [Products]
 *     summary: Create product
 *     requestBody:
 *       required: true
 *         - productInfo
 *         - files
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   productInfo:
 *                         $ref: '#/components/schemas/Products'
 *                   file:
 *                         type: string
 *                         format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Products'
 */

// CREATE PRODUCT
router.post('/', uploadFile('product').single('file'), productController.create);

/**
 * @swagger
 * '/api/products/{id}':
 *  put:
 *     tags: [Products]
 *     summary: Update product
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
 *                   productInfo:
 *                         $ref: '#/components/schemas/Products'
 *                   file:
 *                         type: string
 *                         format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Products'
 */

// UPDATE PRODUCT
router.put('/:id', uploadFile('product').single('file'), productController.update);

/**
 * @swagger
 * '/api/products/{id}':
 *  get:
 *     tags: [Products]
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
 *                 $ref: '#/components/schemas/Products'
 */

// GET PRODUCT BY ID
router.get('/:id', productController.getById);

/**
 * @swagger
 * '/api/products/':
 *  delete:
 *     tags: [Products]
 *     summary: Delete product
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
 *                 $ref: '#/components/schemas/Products'
 */
// DELETE PRODUCT
router.delete('/', productController.delete);

export default router;
