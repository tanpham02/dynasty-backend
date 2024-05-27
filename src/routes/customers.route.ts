import { Router } from 'express';

import { customerController } from '@app/controllers';
import { uploadFile, verifyToken } from '@app/middlewares';

const router = Router();

/**
 * @swagger
 * '/api/customers/search':
 *  get:
 *     tags: [Customers]
 *     summary: Search pagination
 *     parameters:
 *      - name: searchText
 *        in: query
 *        schema:
 *          type: integer($int32)
 *      - name: customerType
 *        in: query
 *        schema:
 *          type: string
 *          enum:
 *            - NEW
 *            - EXIST
 *            - POTENTIAL
 *            - BUY_THE_MOST_ORDERS
 *      - $ref: '#/components/parameters/PageIndex'
 *      - $ref: '#/components/parameters/PageSize'
 *      - $ref: '#/components/parameters/SortBy'
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Customers'
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
 *                 $ref: '#/components/schemas/Customers'
 */

// GET BY ID
router.get('/:id', customerController.getById);

/**
 * @swagger
 * '/api/customers/customer-info':
 *  post:
 *     tags: [Customers]
 *     summary: Find by access token
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   accessToken:
 *                        type: string
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              type: Object
 */

// GET BY ACCESS TOKEN
router.post('/customer-info', customerController.getCustomerInfo);

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
 *                        $ref: '#/components/schemas/Customers'
 *                   file:
 *                        type: string
 *                        format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Customers'
 */

// UPDATE
router.patch('/:id', uploadFile('customers').single('file'), customerController.update);

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
 *                 $ref: '#/components/schemas/Customers'
 */

// DELETE CUSTOMER
router.delete('/', customerController.delete);

export default router;
