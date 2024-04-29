import express from 'express';

import { categoryController } from '@app/controllers';
import { uploadFile } from '@app/middlewares';

const router = express.Router();

/**
 * @swagger
 * '/api/categories/search':
 *  get:
 *     tags: [Category]
 *     summary: Search pagination
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *            type: string
 *       - in: query
 *         name: isShowHomePage
 *         schema:
 *            type: boolean
 *       - $ref: '#/components/parameters/PageIndex'
 *       - $ref: '#/components/parameters/PageSize'
 *       - $ref: '#/components/parameters/SortBy'
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
router.post('/', uploadFile('category').single('file'), categoryController.createCategory);

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
 *                        $ref: '#/components/schemas/Category'
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
 *                 $ref: '#/components/schemas/Category'
 */

// UPDATE CATEGORY
router.patch('/:id', uploadFile('category').single('file'), categoryController.updateCategory);

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
 *                 $ref: '#/components/schemas/Category'
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
 *                 $ref: '#/components/schemas/Category'
 */
// DELETE CATEGORY
router.delete('/', categoryController.deleteCategory);

export default router;
