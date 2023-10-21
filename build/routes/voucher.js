"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var voucher_1 = __importDefault(require("@app/controllers/voucher"));
var express_1 = require("express");
var router = (0, express_1.Router)();
/**
 * @swagger
 * '/api/voucher/search':
 *  get:
 *     tags: [Voucher]
 *     summary: Search pagination
 *     parameters:
 *      - name: name
 *        in: query
 *        schema:
 *          type: string
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
 *                 $ref: '#/components/schema/Voucher'
 */
// SEARCH PAGINATION VOUCHER
router.get('/search', voucher_1.default.search);
/**
 * @swagger
 * '/api/voucher/create':
 *  post:
 *     tags: [Voucher]
 *     summary: Create voucher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Voucher'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Voucher'
 */
// CREATE VOUCHER
router.post('/create', voucher_1.default.create);
/**
 * @swagger
 * '/api/voucher/{id}':
 *  patch:
 *     tags: [Voucher]
 *     summary: Update voucher
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Voucher'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Voucher'
 */
// UPDATE VOUCHER
router.patch('/:id', voucher_1.default.update);
/**
 * @swagger
 * '/api/voucher/{id}':
 *  get:
 *     tags: [Voucher]
 *     summary: Get voucher by id
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
 *                 $ref: '#/components/schema/Voucher'
 */
// GET VOUCHER BY ID
router.get('/:id', voucher_1.default.getById);
/**
 * @swagger
 * '/api/voucher':
 *  delete:
 *     tags: [Voucher]
 *     summary: Delete voucher
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
 *                 $ref: '#/components/schema/Voucher'
 */
// GET VOUCHER BY ID
router.delete('/', voucher_1.default.delete);
exports.default = router;
