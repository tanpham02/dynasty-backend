import productController from '@app/controllers/product';
import express from 'express';
const router = express.Router();

/**
 * @swagger
 * '/api/product/search':
 *  get:
 *     tags: [Product]
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
 *      - name: types
 *        in: query
 *        schema:
 *           type: array
 *           items:
 *              type: string
 *              enum: [NORMAL, NEW, BEST_SELLER, DELICIOUS_MUST_TRY, VEGETARIAN, SPICY, UNIQUE]
 *        explode: false
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
 *                 $ref: '#/components/schema/Product'
 */

//SEARCH PAGINATION PRODUCT
router.get('/search', productController.search);

/**
 * @swagger
 * '/api/product/create':
 *  post:
 *     tags: [Product]
 *     summary: Create product
 *     requestBody:
 *       required: true
 *         - name
 *         - price
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Product'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Product'
 */

// CREATE PRODUCT
router.post('/create', productController.create);

/**
 * @swagger
 * '/api/product/{id}':
 *  patch:
 *     tags: [Product]
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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Product'
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Product'
 */

// UPDATE PRODUCT
router.patch('/:id', productController.update);

/**
 * @swagger
 * '/api/product/{id}':
 *  get:
 *     tags: [Product]
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
 *                 $ref: '#/components/schema/Product'
 */

// GET PRODUCT BY ID
router.get('/:id', productController.getById);

/**
 * @swagger
 * '/api/product/':
 *  delete:
 *     tags: [Product]
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
 *                 $ref: '#/components/schema/Product'
 */
// DELETE PRODUCT
router.delete('/', productController.delete);

export default router;
