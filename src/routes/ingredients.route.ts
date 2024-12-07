import { Router } from 'express';

import { IngredientController } from '@app/controllers';

const router = Router();

/**
 * @swagger
 * '/api/ingredients/search':
 *  get:
 *     tags: [Ingredients]
 *     summary: Search pagination
 *     parameters:
 *      - name: from
 *        in: query
 *        schema:
 *          type: string
 *      - name: to
 *        in: query
 *        schema:
 *          type: string
 *      - name: stockType
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
 *                 $ref: '#/components/schemas/Ingredients'
 */

// SEARCH PAGINATION
router.get('/search', IngredientController.search);

export default router;
