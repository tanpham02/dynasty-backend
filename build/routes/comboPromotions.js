"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var comboPromotions_1 = __importDefault(require("@app/controllers/comboPromotions"));
var express_1 = require("express");
var router = (0, express_1.Router)();
/**
 * @swagger
 * '/api/combo-promotions/search':
 *  get:
 *     tags: [Combo Promotions]
 *     summary: Search pagination
 *     parameters:
 *      - name: name
 *        in: query
 *        schema:
 *          type: string
 *      - name: categoryId
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
 *                 $ref: '#/components/schema/ComboPromotions'
 */
router.get('/search', comboPromotions_1.default.search);
/**
 * @swagger
 * '/api/combo-promotions/create':
 *  post:
 *     tags: [Combo Promotions]
 *     summary: Create combo promotions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/ComboPromotions'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ComboPromotions'
 */
router.post('/create', comboPromotions_1.default.create);
/**
 * @swagger
 * '/api/combo-promotions/{id}':
 *  patch:
 *     tags: [Combo Promotions]
 *     summary: Update combo promotions
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/ComboPromotions'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ComboPromotions'
 */
router.patch('/:id', comboPromotions_1.default.update);
/**
 * @swagger
 * '/api/combo-promotions/{id}':
 *  get:
 *     tags: [Combo Promotions]
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
 *                 $ref: '#/components/schema/ComboPromotions'
 */
router.get('/:id', comboPromotions_1.default.getById);
/**
 * @swagger
 * '/api/combo-promotions/':
 *  delete:
 *     tags: [Combo Promotions]
 *     summary: Delete combo promotion
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ComboPromotions'
 */
router.delete('/', comboPromotions_1.default.delete);
exports.default = router;
