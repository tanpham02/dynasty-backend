"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shopSystem_1 = __importDefault(require("@app/controllers/shopSystem"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
/**
 * @swagger
 * '/api/shop-system/search':
 *  get:
 *     tags: [Shop System]
 *     summary: Search pagination
 *     parameters:
 *      - name: name
 *        in: query
 *        schema:
 *          type: string
 *      - name: cityId
 *        in: query
 *        schema:
 *          type: integer($int32)
 *      - name: districtId
 *        in: query
 *        schema:
 *          type: integer($int32)
 *      - name: wardId
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
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Shop System'
 */
//SEARCH PAGINATION SHOP SYSTEM
router.get('/search', shopSystem_1.default.search);
/**
 * @swagger
 * '/api/shop-system/create':
 *  post:
 *     tags: [Shop System]
 *     summary: Create shop system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Shop System'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Shop System'
 */
// CREATE SHOP SYSTEM
router.post('/create', shopSystem_1.default.create);
/**
 * @swagger
 * '/api/shop-system/{id}':
 *  patch:
 *     tags: [Shop System]
 *     summary: Update shop system
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
 *             $ref: '#/components/schema/Shop System'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Shop System'
 */
// UPDATE SHOP SYSTEM
router.patch('/:id', shopSystem_1.default.update);
/**
 * @swagger
 * '/api/shop-system/{id}':
 *  get:
 *     tags: [Shop System]
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
 *                 $ref: '#/components/schema/Shop System'
 */
// GET SHOP SYSTEM BY ID
router.get('/:id', shopSystem_1.default.getById);
/**
 * @swagger
 * '/api/shop-system/':
 *  delete:
 *     tags: [Shop System]
 *     summary: Delete shop system
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
 *                 $ref: '#/components/schema/Shop System'
 */
// DELETE SHOP SYSTEM
router.delete('/', shopSystem_1.default.delete);
exports.default = router;
