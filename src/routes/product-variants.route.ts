import express from 'express';

import { productVariantController } from '@app/controllers';

const router = express.Router();

/**
 * @swagger
 * '/api/products/variants/search':
 *  get:
 *     tags: [Product Variants]
 *     summary: Search pagination
 *     parameters:
 *      - $ref: '#/components/parameters/PageIndex'
 *      - $ref: '#/components/parameters/PageSize'
 *      - $ref: '#/components/parameters/SortBy'
 *     responses:
 *       200:
 *         description: OK
 */

//SEARCH PAGINATION
router.get('/search', productVariantController.search);

export default router;
