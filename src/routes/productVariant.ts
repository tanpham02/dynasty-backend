import { formDataParser } from '@app/middlewares/formDataParser';
import { productVariantController } from './../controllers/productVariant';
import { uploadFileProduct } from '@app/services/upload';

import express from 'express';
import { FIELDS_NAME } from '@app/constants';
const router = express.Router();

/**
 * @swagger
 * '/api/products-variant':
 *  get:
 *     tags: [Product Variant]
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
 *                 $ref: '#/components/schemas/productVariant'
 */

//SEARCH PAGINATION
router.get('/', productVariantController.search);

/**
 * @swagger
 * '/api/products-variant':
 *  post:
 *     tags: [Product Variant]
 *     summary: Create
 *     requestBody:
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   productVariantInfo:
 *                         $ref: '#/components/schemas/productVariant'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/productVariant'
 */

// CREATE
router.post('/', formDataParser(FIELDS_NAME.PRODUCT_VARIANT), productVariantController.create);

/**
 * @swagger
 * '/api/products-variant/{id}':
 *  patch:
 *     tags: [Product Variant]
 *     summary: Update
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
 *                   productVariantInfo:
 *                         $ref: '#/components/schemas/productVariant'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/productVariant'
 */

// UPDATE
router.patch('/:id', formDataParser(FIELDS_NAME.PRODUCT_VARIANT), productVariantController.update);

/**
 * @swagger
 * '/api/products-variant/{id}':
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
 *                 $ref: '#/components/schema/productVariant'
 */

// GET BY ID
router.get('/:id', productVariantController.getById);

/**
 * @swagger
 * '/api/products-variant/':
 *  delete:
 *     tags: [Product Variant]
 *     summary: Delete
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
 *                 $ref: '#/components/schema/productVariant'
 */
// DELETE
router.delete('/', productVariantController.delete);

export default router;
