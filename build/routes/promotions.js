"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promotions_1 = __importDefault(require("@app/controllers/promotions"));
var express_1 = require("express");
var router = (0, express_1.Router)();
/**
 * @swagger
 * '/api/promotions/search':
 *  get:
 *     tags: [Promotions]
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
 *                 $ref: '#/components/schema/Promotions'
 */
router.get('/search', promotions_1.default.search);
/**
 * @swagger
 * '/api/promotions/create':
 *  post:
 *     tags: [Promotions]
 *     summary: Create promotions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Promotions'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Promotions'
 */
router.post('/create', promotions_1.default.create);
/**
 * @swagger
 * '/api/promotions/{id}':
 *  patch:
 *     tags: [Promotions]
 *     summary: Update promotions
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
 *             $ref: '#/components/schema/Promotions'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Promotions'
 */
router.patch('/:id', promotions_1.default.update);
/**
 * @swagger
 * '/api/promotions/{id}':
 *  get:
 *     tags: [Promotions]
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
 *                 $ref: '#/components/schema/Promotions'
 */
router.get('/:id', promotions_1.default.getById);
/**
 * @swagger
 * '/api/promotions/':
 *  delete:
 *     tags: [Promotions]
 *     summary: Delete promotions
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
 *                 $ref: '#/components/schema/Promotions'
 */
router.delete('/', promotions_1.default.delete);
exports.default = router;
