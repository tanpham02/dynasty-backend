"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var customer_1 = __importDefault(require("@app/controllers/customer"));
var express_1 = require("express");
var router = (0, express_1.Router)();
/**
 * @swagger
 * '/api/customers/search':
 *  get:
 *     tags: [Customer]
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
router.get('/search', customer_1.default.search);
/**
 * @swagger
 * '/api/customers/{id}':
 *  get:
 *     tags: [Customer]
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
router.get('/:id', customer_1.default.getById);
/**
 * @swagger
 * '/api/customers/{id}':
 *  patch:
 *     tags: [Customer]
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
router.patch('/:id', customer_1.default.update);
/**
 * @swagger
 * '/api/customers':
 *  delete:
 *     tags: [Customer]
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
router.delete('/', customer_1.default.delete);
exports.default = router;
