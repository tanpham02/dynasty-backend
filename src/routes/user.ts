import { Router } from 'express';
import userController from '@app/controllers/user';
import { verifyToken, verifyTokenAndAuthenRole } from '@app/middlewares/verifyToken';
import { uploadFileUser } from '@app/services/upload';

const router = Router();

/**
 * @swagger
 * '/api/users/search':
 *  get:
 *     tags: [User]
 *     summary: Search pagination
 *     parameters:
 *      - name: fullName
 *        in: query
 *        schema:
 *          type: string
 *      - name: role
 *        in: query
 *        schema:
 *          type: string
 *          enum:
 *             - ADMIN
 *             - USER
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
 * '/api/users/create':
 *  post:
 *     tags: [User]
 *     summary: Create user
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   userInfo:
 *                        $ref: '#/components/schema/User'
 *                   files:
 *                        type: string
 *                        format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/User'
 */

// CREATE
router.post('/create', uploadFileUser, userController.create);

/**
 * @swagger
 * '/api/users/{id}':
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
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   userInfo:
 *                        $ref: '#/components/schema/User'
 *                   files:
 *                        type: string
 *                        format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/User'
 */
// UPDATE
router.patch('/:id', uploadFileUser, userController.update);

/**
 * @swagger
 * '/api/users/{id}':
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
 * '/api/users':
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
