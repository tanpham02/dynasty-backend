import customerController from '@app/controllers/customers';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * '/api/customers/search':
 *  get:
 *     tags: [Customers]
 *     summary: Search pagination
 *     parameters:
 *      - name: fullName
 *        in: query
 *        schema:
 *          type: integer($int32)
 *      - name: pageIndex
 *        in: query
 *        schema:
 *          type: integer($int32)
 *      - name: pageSize
 *        in: query
 *        schema:
 *          type: integer($int32)
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Customer'
 */

// SEARCH PAGINATION
router.get('/search', customerController.search);

/**
 * @swagger
 * '/api/customers/{id}':
 *  get:
 *     tags: [Customers]
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
 *                 $ref: '#/components/schema/Customer'
 */

// GET BY ID
router.get('/:id', customerController.getById);

/**
 * @swagger
 * '/api/customers/{id}':
 *  patch:
 *     tags: [Customers]
 *     summary: Update customer
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
 *                   customerInfo:
 *                        $ref: '#/components/schema/Customer'

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Customer'
 */

// UPDATE
router.patch('/:id', customerController.update);

/**
 * @swagger
 * '/api/customers':
 *  delete:
 *     tags: [Customers]
 *     summary: Delete customer
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *         required: true
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Customer'
 */

// DELETE CUSTOMER
router.delete('/', customerController.delete);

export default router;
