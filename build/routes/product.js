"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = __importDefault(require("@app/controllers/product"));
var upload_1 = require("@app/services/upload");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
/**
 * @swagger
 * '/api/products/search':
 *  get:
 *     tags: [Product]
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
 *      - name: types
 *        in: query
 *        schema:
 *           type: array
 *           items:
 *              type: string
 *              enum: [NORMAL, NEW, BEST_SELLER, DELICIOUS_MUST_TRY, VEGETARIAN, SPICY, UNIQUE]
 *        explode: false
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
 *                 $ref: '#/components/schema/Product'
 */
//SEARCH PAGINATION PRODUCT
router.get('/search', product_1.default.search);
/**
 * @swagger
 * '/api/products/create':
 *  post:
 *     tags: [Product]
 *     summary: Create product
 *     requestBody:
 *       required: true
 *         - productInfo
 *         - files
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   productInfo:
 *                         $ref: '#/components/schema/Product'
 *                   files:
 *                        type: string
 *                        format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Product'
 */
// CREATE PRODUCT
router.post('/create', upload_1.uploadFileProduct, product_1.default.create);
/**
 * @swagger
 * '/api/products/{id}':
 *  patch:
 *     tags: [Product]
 *     summary: Update product
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
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   productInfo:
 *                         $ref: '#/components/schema/Product'
 *                   files:
 *                        type: string
 *                        format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Product'
 */
// UPDATE PRODUCT
router.patch('/:id', upload_1.uploadFileProduct, product_1.default.update);
/**
 * @swagger
 * '/api/products/{id}':
 *  get:
 *     tags: [Product]
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
 *                 $ref: '#/components/schema/Product'
 */
// GET PRODUCT BY ID
router.get('/:id', product_1.default.getById);
/**
 * @swagger
 * '/api/products/':
 *  delete:
 *     tags: [Product]
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
 *                 $ref: '#/components/schema/Product'
 */
// DELETE PRODUCT
router.delete('/', product_1.default.delete);
exports.default = router;
