import materialController from '@app/controllers/materials';
import { verifyTokenAndAuthenRole } from '@app/middlewares/verifyToken';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * '/api/materials/search':
 *  get:
 *     tags: [Materials]
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
 * '/api/materials/create':
 *  post:
 *     tags: [Materials]
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
 * '/api/materials/{id}':
 *  get:
 *     tags: [Materials]
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
 * '/api/materials/{id}':
 *  get:
 *     tags: [Materials]
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
 * '/api/materials/{id}':
 *  delete:
 *     tags: [Materials]
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
