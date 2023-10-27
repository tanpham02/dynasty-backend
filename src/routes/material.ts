import materialController from '@app/controllers/material';
import { verifyTokenAndAuthenRole } from '@app/middlewares/verifyToken';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * '/api/material/search':
 *  get:
 *     tags: [Material]
 *     summary: Search pagination
 *     parameters:
 *      - name: from
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-15
 *      - name: to
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-15
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
 *                 $ref: '#/components/schema/Material'
 */

// SEARCH PAGINATION
router.get('/search', materialController.search);

/**
 * @swagger
 * '/api/material/create':
 *  post:
 *     tags: [Material]
 *     summary: Create the material
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Material'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Material'
 */

// CREATE MATERIAL
router.post('/create', materialController.createMaterial);

/**
 * @swagger
 * '/api/material/{id}':
 *  get:
 *     tags: [Material]
 *     summary: Find by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Material'
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Material'
 */

// GET BY ID
router.patch('/:id', materialController.updateMaterial);

/**
 * @swagger
 * '/api/material/{id}':
 *  get:
 *     tags: [Material]
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
 *                 $ref: '#/components/schema/Material'
 */

// GET BY ID
router.get('/:id', materialController.getMaterialById);

/**
 * @swagger
 * '/api/material/{id}':
 *  delete:
 *     tags: [Material]
 *     summary: Delete
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
 *                 $ref: '#/components/schema/Material'
 */

// DELETE MATERIAL
router.delete('/:id', verifyTokenAndAuthenRole, materialController.delete);

export default router;
