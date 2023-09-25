import { Router } from 'express';
import userController from '@app/controllers/user';
import { verifyToken, verifyTokenAndAuthenRole } from '@app/middlewares/verifyToken';

const router = Router();

/**
 * @swagger
 * '/api/user/search':
 *  get:
 *     tags: [User]
 *     summary: Search pagination
 *     parameters:
 *      - name: fullName
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
 *                 $ref: '#/components/schema/User'
 */

// SEARCH PAGINATION
router.get('/search', userController.search);

/**
 * @swagger
 * '/api/user/create':
 *  post:
 *     tags: [User]
 *     summary: Create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/User'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/User'
 */

// CREATE
router.post('/create', userController.create);

/**
 * @swagger
 * '/api/user/{id}':
 *  patch:
 *     tags: [User]
 *     summary: Update user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/User'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/User'
 */
// UPDATE
router.patch('/:id', userController.update);

/**
 * @swagger
 * '/api/user/{id}':
 *  get:
 *     tags: [User]
 *     summary: Get user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/User'
 */

// GET BY ID
router.get('/:id', userController.getById);

/**
 * @swagger
 * '/api/user':
 *  delete:
 *     tags: [User]
 *     summary: Delete user
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
 *                 $ref: '#/components/schema/User'
 */
router.delete('/', verifyTokenAndAuthenRole, userController.delete);

export default router;
