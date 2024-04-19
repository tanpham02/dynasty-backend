import { Router } from 'express';

import { FIELDS_NAME } from '@app/constants/app';
import emailConfigController from '@app/controllers/email-config.controller';
import materialController from '@app/controllers/materials.controller';
import { formDataParser } from '@app/utils/form-data-parser.util';

const router = Router();

/**
 * @swagger
 * '/api/email-config/search':
 *  get:
 *     tags: [Email Config]
 *     summary: Search pagination
 *     parameters:
 *      - name: pageIndex
 *        in: query
 *        default: 0
 *        schema:
 *          type: integer($int32)
 *      - name: pageSize
 *        in: query
 *        default: 10
 *        schema:
 *          type: integer($int32)
 *      - name: isDefault
 *        in: query
 *        description: Allow value 0 | 1
 *        schema:
 *          type: number
 *        default: 1
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/EmailConfig'
 */

// SEARCH PAGINATION
router.get('/search', emailConfigController.searchPagination);

/**
 * @swagger
 * '/api/email-config':
 *  post:
 *     tags: [Email Config]
 *     summary: Create
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   emailConfigInfo:
 *                        $ref: '#/components/schema/EmailConfig'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/EmailConfig'
 */

// CREATE
router.post('/', formDataParser(FIELDS_NAME.EMAIL_CONFIG), emailConfigController.create);

/**
 * @swagger
 * '/api/email-config/{id}':
 *  patch:
 *     tags: [Email Config]
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
 *                   emailConfigInfo:
 *                        $ref: '#/components/schema/EmailConfig'
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/EmailConfig'
 */

// GET BY ID
router.patch('/:id', formDataParser(FIELDS_NAME.EMAIL_CONFIG), emailConfigController.update);

/**
 * @swagger
 * '/api/email-config/{id}':
 *  get:
 *     tags: [Email Config]
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
 *                 $ref: '#/components/schema/EmailConfig'
 */

// GET BY ID
router.get('/:id', emailConfigController.getById);

/**
 * @swagger
 * '/api/email-config/{id}':
 *  delete:
 *     tags: [Email Config]
 *     summary: Delete
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           item: string
 *         required: true
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/EmailConfig'
 */

// DELETE
router.delete('/:id', emailConfigController.delete);

export default router;
