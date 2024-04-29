import { Router } from 'express';

import { FIELDS_NAME } from '@app/constants';
import { emailTemplateController } from '@app/controllers';
import { formDataParser } from '@app/utils';

const router = Router();

/**
 * @swagger
 * '/api/email-template/search-all':
 *  get:
 *     tags: [Email Template]
 *     summary: Search all
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/EmailTemplate'
 */

// SEARCH PAGINATION
router.get('/search-all', emailTemplateController.searchAll);

/**
 * @swagger
 * '/api/email-template':
 *  post:
 *     tags: [Email Template]
 *     summary: Create
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                  $ref: '#/components/schemas/EmailTemplate'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/EmailTemplate'
 */

// CREATE
router.post('/', emailTemplateController.create);

/**
 * @swagger
 * '/api/email-template/{id}':
 *  patch:
 *     tags: [Email Template]
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
 *                   $ref: '#/components/schemas/EmailTemplate'
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/EmailTemplate'
 */

// GET BY ID
router.patch('/:id', formDataParser(FIELDS_NAME.EMAIL_TEMPLATE), emailTemplateController.update);

/**
 * @swagger
 * '/api/email-template/{id}':
 *  get:
 *     tags: [Email Template]
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
 *                 $ref: '#/components/schemas/EmailTemplate'
 */

// GET BY ID
router.get('/:id', emailTemplateController.getById);

/**
 * @swagger
 * '/api/email-template/{id}':
 *  delete:
 *     tags: [Email Template]
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
 *                 $ref: '#/components/schemas/EmailTemplate'
 */

// DELETE
router.delete('/:id', emailTemplateController.deleteOne);

export default router;
