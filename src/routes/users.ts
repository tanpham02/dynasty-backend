import { Router } from 'express';
import userController from '@app/controllers/users';
import { verifyTokenAndAuthenRole } from '@app/middlewares/verifyToken';
import { uploadFileUser } from '@app/services/upload';

const router = Router();

/**
 * @swagger
 * '/api/users/search':
 *  get:
 *     tags: [Users]
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
 *                 $ref: '#/components/schema/Users'
 */

// SEARCH PAGINATION
router.get('/search', userController.search);

/**
 * @swagger
 * '/api/users':
 *  post:
 *     tags: [Users]
 *     summary: Create user
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   userInfo:
 *                        $ref: '#/components/schema/Users'
 *                   file:
 *                        type: string
 *                        format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Users'
 */

// CREATE
router.post('/', uploadFileUser, userController.create);

/**
 * @swagger
 * '/api/users/update-user/{id}':
 *  patch:
 *     tags: [Users]
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
 *                        $ref: '#/components/schema/Users'
 *                   file:
 *                        type: string
 *                        format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Users'
 */
// UPDATE
router.patch('/update-user/:id', uploadFileUser, userController.update);

/**
 * @swagger
 * '/api/users/{id}':
 *  get:
 *     tags: [Users]
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
 *                 $ref: '#/components/schema/Users'
 */

// GET BY ID
router.get('/:id', userController.getById);

/**
 * @swagger
 * '/api/users':
 *  delete:
 *     tags: [Users]
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
 *                 $ref: '#/components/schema/Users'
 */
router.delete('/', verifyTokenAndAuthenRole, userController.delete);

export default router;
