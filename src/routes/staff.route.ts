import { Router } from 'express';

import { staffController } from '@app/controllers';
import { verifyTokenAndRolePermission } from '@app/middlewares/verify-token';
import { uploadFileUser } from '@app/services/upload';

const router = Router();

/**
 * @swagger
 * '/api/staff/search':
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
router.get('/search', staffController.search);

/**
 * @swagger
 * '/api/staff':
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
router.post('/', uploadFileUser, staffController.create);

/**
 * @swagger
 * '/api/staff/{id}':
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
router.patch('/:id', uploadFileUser, staffController.update);

/**
 * @swagger
 * '/api/staff/{id}':
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
router.get('/:id', staffController.getById);

/**
 * @swagger
 * '/api/staff':
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
router.delete('/', verifyTokenAndRolePermission, staffController.delete);

export default router;
