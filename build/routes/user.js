"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = __importDefault(require("@app/controllers/user"));
var verifyToken_1 = require("@app/middlewares/verifyToken");
var upload_1 = require("@app/services/upload");
var router = (0, express_1.Router)();
/**
 * @swagger
 * '/api/users/search':
 *  get:
 *     tags: [User]
 *     summary: Search pagination
 *     parameters:
 *      - name: fullName
 *        in: query
 *        schema:
 *          type: string
 *      - name: role
 *        in: query
 *        schema:
 *          type: string
 *          enum:
 *             - ADMIN
 *             - USER
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
 *                 $ref: '#/components/schema/User'
 */
// SEARCH PAGINATION
router.get('/search', user_1.default.search);
/**
 * @swagger
 * '/api/users/create':
 *  post:
 *     tags: [User]
 *     summary: Create user
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   userInfo:
 *                        $ref: '#/components/schema/User'
 *                   files:
 *                        type: string
 *                        format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/User'
 */
// CREATE
router.post('/create', upload_1.uploadFileUser, user_1.default.create);
/**
 * @swagger
 * '/api/users/{id}':
 *  patch:
 *     tags: [User]
 *     summary: Update user
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
 *                   userInfo:
 *                        $ref: '#/components/schema/User'
 *                   files:
 *                        type: string
 *                        format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/User'
 */
// UPDATE
router.patch('/:id', upload_1.uploadFileUser, user_1.default.update);
/**
 * @swagger
 * '/api/users/{id}':
 *  get:
 *     tags: [User]
 *     summary: Get user by id
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
 *                 $ref: '#/components/schema/User'
 */
// GET BY ID
router.get('/:id', user_1.default.getById);
/**
 * @swagger
 * '/api/users':
 *  delete:
 *     tags: [User]
 *     summary: Delete user
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
 *                 $ref: '#/components/schema/User'
 */
router.delete('/', verifyToken_1.verifyTokenAndAuthenRole, user_1.default.delete);
exports.default = router;
