import { FIELDS_NAME } from '@app/constants/app';
import termAndPolicyController from '@app/controllers/term-and-policy.controller';
import { formDataParser } from '@app/utils/form-data-parser.util';
import express from 'express';
const router = express.Router();

/**
 * @swagger
 * '/api/term-and-policy/search-all':
 *  get:
 *     tags: [Term And Policy]
 *     summary: Search all
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Term And Policy'
 */

//SEARCH ALL
router.get('/search-all', termAndPolicyController.searchAll);

/**
 * @swagger
 * '/api/term-and-policy':
 *  post:
 *     tags: [Term And Policy]
 *     summary: Create
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   termAndPolicyInfo:
 *                        $ref: '#/components/schema/Term And Policy'

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Term And Policy'
 */

// CREATE
router.post('/', formDataParser(FIELDS_NAME.TERM_AND_POLICY), termAndPolicyController.create);

/**
 * @swagger
 * '/api/term-and-policy/{id}':
 *  patch:
 *     tags: [Term And Policy]
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
 *                   termAndPolicyInfo:
 *                        $ref: '#/components/schema/Term And Policy'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Term And Policy'
 */

// UPDATE
router.patch('/:id', formDataParser(FIELDS_NAME.TERM_AND_POLICY), termAndPolicyController.update);

/**
 * @swagger
 * '/api/term-and-policy/{id}':
 *  get:
 *     tags: [Term And Policy]
 *     summary: Get by id
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
 *                 $ref: '#/components/schema/Term And Policy'
 */

// GET  BY ID
router.get('/:id', termAndPolicyController.getById);

/**
 * @swagger
 * '/api/term-and-policy/':
 *  delete:
 *     tags: [Term And Policy]
 *     summary: Delete
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
 *                 $ref: '#/components/schema/Term And Policy'
 */

// DELETE
router.delete('/', termAndPolicyController.delete);

export default router;
