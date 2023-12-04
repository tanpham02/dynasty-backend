import { FIELDS_NAME } from '@app/constants';
import categoryController from '@app/controllers/category';
import { formDataParser } from '@app/middlewares/formDataParser';
import { verifyToken } from '@app/middlewares/verifyToken';
import express from 'express';

const router = express.Router();

// *     security:
// *       - bearerAuth: []

/**
 * @swagger
 * '/api/category':
 *  get:
 *     tags: [Category]
 *     summary: Search pagination
 *     parameters:
 *      - name: name
 *        in: query
 *        schema:
 *          type: string
 *      - name: comboPromotionsId
 *        in: query
 *        schema:
 *          type: string
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
 *                 $ref: '#/components/schema/Category'
 */

// SEARCH PAGINATION CATEGORY
router.get('/', categoryController.search);

/**
 * @swagger
 * '/api/category':
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
 *                        $ref: '#/components/schema/Category'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Category'
 */

// CREATE CATEGORY
router.post('/', formDataParser(FIELDS_NAME.CATEGORY), categoryController.createCategory);

/**
 * @swagger
 * '/api/category/{id}':
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
router.patch('/:id', formDataParser(FIELDS_NAME.CATEGORY), categoryController.updateCategory);

/**
 * @swagger
 * '/api/category/{id}':
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
 * '/api/category/':
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

/**
 * @swagger
 * '/api/category/search/home-page':
 *  get:
 *     tags: [Category]
 *     summary: Search to show product
 *     parameters:
 *       - in: query
 *         name: pageIndex
 *         type: string
 *       - in: query
 *         name: pageSize
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Category'
 */
// SEARCH PRODUCT SHOW CLIENT
router.get('/search/home-page', categoryController.searchPaginationShowClient);

export default router;
