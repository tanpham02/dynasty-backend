import { Router } from 'express';

import { stockManagementController } from '@app/controllers';

const router = Router();

/**
 * @swagger
 * '/api/stock-managements/search':
 *  get:
 *     tags: [Stock Managements]
 *     summary: Search pagination
 *     parameters:
 *      - name: from
 *        in: query
 *        schema:
 *          type: string
 *      - name: to
 *        in: query
 *        schema:
 *          type: string
 *      - name: stockType
 *        in: query
 *        schema:
 *          type: string
 *      - $ref: '#/components/parameters/PageIndex'
 *      - $ref: '#/components/parameters/PageSize'
 *      - $ref: '#/components/parameters/SortBy'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/StockManagements'
 */

// SEARCH PAGINATION
router.get('/search', stockManagementController.search);

/**
 * @swagger
 * '/api/stock-managements':
 *  post:
 *     tags: [Stock Managements]
 *     summary: Create
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                  $ref: '#/components/schemas/StockManagements'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/StockManagements'
 */

// CREATE
router.post('/', stockManagementController.createStockManagement);

/**
 * @swagger
 * '/api/stock-managements/{id}':
 *  patch:
 *     tags: [Stock Managements]
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
 *                  $ref: '#/components/schemas/StockManagements'
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/StockManagements'
 */

// GET BY ID
router.patch('/:id', stockManagementController.updateStockManagement);

/**
 * @swagger
 * '/api/stock-managements/{id}':
 *  get:
 *     tags: [Stock Managements]
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
 *                 $ref: '#/components/schemas/StockManagements'
 */

// GET BY ID
router.get('/:id', stockManagementController.getStockManagementById);

/**
 * @swagger
 * '/api/stock-managements/{id}':
 *  delete:
 *     tags: [Stock Managements]
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
 *                 $ref: '#/components/schemas/StockManagements'
 */

// DELETE
router.delete('/:id', stockManagementController.delete);

/**
 * @swagger
 * '/api/stock-managements/invoice-export':
 *  post:
 *     tags: [Stock Managements]
 *     summary: Invoice export
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/StockManagements'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/StockManagements'
 */

// INVOICE
router.post('/invoice-export', stockManagementController.invoice);

export default router;
