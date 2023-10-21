"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var configStore_1 = __importDefault(require("@app/controllers/configStore"));
var express_1 = require("express");
var router = (0, express_1.Router)();
/**
 * @swagger
 * '/api/config-store/find':
 *  get:
 *     tags: [Config Store]
 *     summary: Find all
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ConfigStore'
 */
// GET ALL
router.get('/find', configStore_1.default.getAll);
/**
 * @swagger
 * '/api/config-store/{id}':
 *  patch:
 *     tags: [Config Store]
 *     summary: Update config store
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
 *             $ref: '#/components/schema/ConfigStore'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ConfigStore'
 */
// UPDATE
router.patch('/:id', configStore_1.default.updateOverriding);
exports.default = router;
