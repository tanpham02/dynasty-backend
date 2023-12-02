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
router.post('/', formDataParser(), categoryController.createCategory);

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
router.patch('/:id', categoryController.updateCategory);

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
 * '/api/category/child/{childCategoryId}':
 *  get:
 *     tags: [Category]
 *     summary: Find category children by id
 *     parameters:
 *       - in: path
 *         name: childCategoryId
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

// GET CATEGORY CHILDREN BY ID
// router.get('/child/:childCategoryId', categoryController.getChildrenCategoryById);

/**
 * @swagger
 * '/api/category/child/{childCategoryId}':
 *  patch:
 *     tags: [Category]
 *     summary: Update child category
 *     parameters:
 *       - in: path
 *         name: childCategoryId
 *         required: true
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/ChildCategory'
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ChildCategory'
 */

// UPDATE CATEGORY CHILDREN
// router.patch('/child/:childCategoryId', categoryController.updateChildrenCategory);

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
 * '/api/category/child/{parentCategoryId}':
 *  delete:
 *     tags: [Category]
 *     summary: Delete child category
 *     parameters:
 *       - in: path
 *         name: parentCategoryId
 *         type: string
 *         required: true
 *       - in: query
 *         name: childCategoryId
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
// router.delete('/child/:parentCategoryId', categoryController.deleteChildrenCategory);

/**
 * @swagger
 * '/api/category/child/{parentCategoryId}':
 *  post:
 *     tags: [Category]
 *     summary: Add child category
 *     parameters:
 *       - in: path
 *         name: parentCategoryId
 *         type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/ChildrenCategory'

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ChildrenCategory'
 */
// DELETE CATEGORY
// router.post('/child/:parentCategoryId', categoryController.addChildrenCategory);

/**
 * @swagger
 * '/api/category/search-product/{id}':
 *  get:
 *     tags: [Category]
 *     summary: Search to show product
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
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
// router.get('/search-product/:id', categoryController.searchPaginationShowClient);

export default router;
