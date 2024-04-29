import { Router } from 'express';

import { staffController } from '@app/controllers';
import { verifyToken, verifyTokenAndRolePermission } from '@app/middlewares';
import { uploadFile } from '@app/middlewares';

const router = Router();

/**
 * @swagger
 * '/api/staff/search':
 *  get:
 *     tags: [Staff]
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
 *      - $ref: '#/components/parameters/PageIndex'
 *      - $ref: '#/components/parameters/PageSize'
 *      - $ref: '#/components/parameters/SortBy'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Staff'
 */

// SEARCH PAGINATION
router.get('/search', staffController.search);

/**
 * @swagger
 * '/api/staff':
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Staff]
 *     summary: Create staff
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   staffInfo:
 *                        $ref: '#/components/schemas/Staff'
 *                   file:
 *                        type: string
 *                        format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Staff'
 */

// CREATE
router.post('/', verifyToken, uploadFile('staff').single('file'), staffController.create);

/**
 * @swagger
 * '/api/staff/{id}':
 *  patch:
 *     security:
 *       - bearerAuth: []
 *     tags: [Staff]
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
 *                   staffInfo:
 *                        $ref: '#/components/schemas/Staff'
 *                   file:
 *                        type: string
 *                        format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Staff'
 */
// UPDATE
router.patch(
  '/:id',
  verifyTokenAndRolePermission,
  uploadFile('staff').single('file'),
  staffController.update,
);

/**
 * @swagger
 * '/api/staff/{id}':
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Staff]
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
 *                 $ref: '#/components/schemas/Staff'
 */

// GET BY ID
router.get('/:id', verifyToken, staffController.getById);

/**
 * @swagger
 * '/api/staff':
 *  delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Staff]
 *     summary: Delete staff
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
 *                 $ref: '#/components/schemas/Staff'
 */
router.delete('/', verifyTokenAndRolePermission, staffController.delete);

export default router;
