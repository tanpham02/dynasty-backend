import { Router } from 'express';

import { materialController } from '@app/controllers';

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
 *        description: VD 2023-10-15 00:00:00
 *      - name: to
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-15 23:59:00
 *      - $ref: '#/components/parameters/PageIndex'
 *      - $ref: '#/components/parameters/PageSize'
 *      - $ref: '#/components/parameters/SortBy'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Materials'
 */

// SEARCH PAGINATION
router.get('/search', materialController.search);

/**
 * @swagger
 * '/api/materials':
 *  post:
 *     tags: [Materials]
 *     summary: Create the material
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Materials'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Materials'
 */

// CREATE MATERIAL
router.post('/', materialController.createMaterial);

/**
 * @swagger
 * '/api/materials/{id}':
 *  patch:
 *     tags: [Materials]
 *     summary: Update
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Materials'
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Materials'
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
 *                 $ref: '#/components/schemas/Materials'
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
 *                 $ref: '#/components/schemas/Materials'
 */

// DELETE MATERIAL
router.delete('/:id', materialController.delete);

export default router;
