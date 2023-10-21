"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = __importDefault(require("@app/controllers/material"));
var verifyToken_1 = require("@app/middlewares/verifyToken");
var express_1 = require("express");
var router = (0, express_1.Router)();
/**
 * @swagger
 * '/api/material/search':
 *  get:
 *     tags: [Material]
 *     summary: Search pagination
 *     parameters:
 *      - name: from
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-15
 *      - name: to
 *        in: query
 *        schema:
 *          type: string
 *        description: VD 2023-10-15
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
 *                 $ref: '#/components/schema/Material'
 */
// SEARCH PAGINATION
router.get('/search', material_1.default.search);
/**
 * @swagger
 * '/api/material/create':
 *  post:
 *     tags: [Material]
 *     summary: Create the material
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Material'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Material'
 */
// CREATE MATERIAL
router.post('/create', material_1.default.createMaterial);
/**
 * @swagger
 * '/api/material/{id}':
 *  get:
 *     tags: [Material]
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
 *                 $ref: '#/components/schema/Material'
 */
// GET BY ID
router.get('/:id', material_1.default.getMaterialById);
/**
 * @swagger
 * '/api/material/{id}':
 *  delete:
 *     tags: [Material]
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
 *                 $ref: '#/components/schema/Material'
 */
// DELETE MATERIAL
router.delete('/:id', verifyToken_1.verifyTokenAndAuthenRole, material_1.default.delete);
exports.default = router;
