import express from 'express';

import { productFavoriteController } from '@app/controllers';

const router = express.Router();

/**
 * @swagger
 * '/api/products/favorite/search':
 *  get:
 *     tags: [Product Favorite]
 *     summary: Search pagination
 *     parameters:
 *      - name: customerId
 *        in: query
 *        schema:
 *          type: string
 *      - $ref: '#/components/parameters/PageIndex'
 *      - $ref: '#/components/parameters/PageSize'
 *      - $ref: '#/components/parameters/SortBy'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ProductFavorite'
 */

//SEARCH PAGINATION
router.get('/search', productFavoriteController.search);

/**
 * @swagger
 * '/api/products/favorite':
 *  patch:
 *     tags: [Product Favorite]
 *     summary: Update product
 *     parameters:
 *       - in: query
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ProductFavorite'
 */

// UPDATE
router.patch('/', productFavoriteController.updateProductFavorite);

/**
 * @swagger
 * '/api/products/favorite':
 *  delete:
 *     tags: [Product Favorite]
 *     summary: Find by id
 *     parameters:
 *       - in: query
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: productId
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
 *                 $ref: '#/components/schemas/ProductFavorite'
 */

//  DELETE
router.delete('/', productFavoriteController.deleteProductFavorite);

export default router;
