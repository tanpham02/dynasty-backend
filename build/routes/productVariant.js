"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var productVariant_1 = __importDefault(require("@app/controllers/productVariant"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
/**
 * @swagger
 * '/api/product-variant/search':
 *  get:
 *     tags: [Product Variant]
 *     summary: Search pagination
 *     parameters:
 *      - name: productId
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
 *                 $ref: '#/components/schema/ProductVariant'
 */
// SEARCH PAGINATION
router.get('/search', productVariant_1.default.search);
/**
 * @swagger
 * '/api/product-variant/create':
 *  post:
 *     tags: [Product Variant]
 *     summary: Create product variant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/ProductVariant'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ProductVariant'
 */
// CREATE PRODUCT VARIANT
router.post('/create', productVariant_1.default.create);
/**
 * @swagger
 * '/api/product-variant/{id}':
 *  patch:
 *     tags: [Product Variant]
 *     summary: Update product variant
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
 *             $ref: '#/components/schema/ProductVariant'
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ProductVariant'
 */
// UPDATE PRODUCT VARIANT
router.patch('/:id', productVariant_1.default.update);
/**
 * @swagger
 * '/api/product-variant/{id}':
 *  get:
 *     tags: [Product Variant]
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
 *                 $ref: '#/components/schema/ProductVariant'
 */
// GET PRODUCT VARIANT BY ID
router.get('/:id', productVariant_1.default.getById);
/**
 * @swagger
 * '/api/product-variant/':
 *  delete:
 *     tags: [Product Variant]
 *     summary: Delete product variant
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
 *                 $ref: '#/components/schema/ProductVariant'
 */
// DELETE PRODUCT VARIANT
router.delete('/', productVariant_1.default.delete);
exports.default = router;
