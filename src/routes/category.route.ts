import categoryController from '@app/controllers/categories.controller';
import { uploadFileCategory } from '@app/services/upload';
import express from 'express';

const router = express.Router();

// *     security:
// *       - bearerAuth: []

/**
 * @swagger
 * '/api/categories/search':
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Category]
 *     summary: Search pagination
 *     parameters:
 *      - name: name
 *        in: query
 *        schema:
 *          type: string
 *      - name: sort
 *        in: query
 *        schema:
 *          type: string
 *        description: Allow value 1 | -1
 *      - name: isShowHomePage
 *        in: query
 *        schema:
 *          type: number
 *        description: Allow value 1 | 0
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
 *                 $ref: '#/components/schemas/Category'
 */

// SEARCH PAGINATION CATEGORY
router.get('/search', categoryController.search);

/**
 * @swagger
 * '/api/categories/search-all':
 *  get:
 *     tags: [Category]
 *     summary: Search all
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Category'
 */

// SEARCH ALL
router.get('/search-all', categoryController.searchAll);

/**
 * @swagger
 * '/api/categories':
 *  post:
 *     tags: [Category]
 *     summary: Create category
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   categoryInfo:
 *                        $ref: '#/components/schemas/Category'
 *                   file:
 *                        type: string
 *                        format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Category'
 */

// CREATE CATEGORY
router.post('/', uploadFileCategory, categoryController.createCategory);

/**
 * @swagger
 * '/api/categories/{id}':
 *  patch:
 *     tags: [Category]
 *     summary: Update category
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
 *                   categoryInfo:
 *                        $ref: '#/components/schema/Category'
 *                   file:
 *                        type: string
 *                        format: binary
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Category'
 */

// UPDATE CATEGORY
router.patch('/:id', uploadFileCategory, categoryController.updateCategory);

/**
 * @swagger
 * '/api/categories/{id}':
 *  get:
 *     tags: [Category]
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
 *                 $ref: '#/components/schema/Category'
 */

// GET BY ID CATEGORY
router.get('/:id', categoryController.getCategoryById);

/**
 * @swagger
 * '/api/categories/':
 *  delete:
 *     tags: [Category]
 *     summary: Delete category
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
 *                 $ref: '#/components/schema/Category'
 */
// DELETE CATEGORY
router.delete('/', categoryController.deleteCategory);

export default router;
