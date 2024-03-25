import { FIELDS_NAME } from '@app/constants';
import materialController from '@app/controllers/materials';
import { formDataParser } from '@app/utils/formDataParser';
import { verifyTokenAndRolePermission } from '@app/middlewares/verifyToken';
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
 *        description: VD 2023-10-15 00:00:00
 *      - name: to
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-15 23:59:00
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
 *                 $ref: '#/components/schema/Materials'
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
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   materialInfo:
 *                        $ref: '#/components/schema/Materials'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Materials'
 */

// CREATE MATERIAL
router.post('/', formDataParser(FIELDS_NAME.MATERIAL), materialController.createMaterial);

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
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   materialInfo:
 *                        $ref: '#/components/schema/Materials'
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Materials'
 */

// GET BY ID
router.patch('/:id', formDataParser(FIELDS_NAME.MATERIAL), materialController.updateMaterial);

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
 *                 $ref: '#/components/schema/Materials'
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
 *                 $ref: '#/components/schema/Materials'
 */

// DELETE MATERIAL
router.delete('/:id', materialController.delete);

export default router;
