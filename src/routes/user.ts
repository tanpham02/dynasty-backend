import { Router } from 'express';
import userController from '@app/controllers/user';

const router = Router();

/**
 * @swagger
 * '/api/user/search':
 *  get:
 *     tags: [User]
 *     summary: Search pagination
 *     parameters:
 *      - name: name
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
 *                 $ref: '#/components/schema/User'
 */

// SEARCH PAGINATION
router.get('/search', userController.search);

export default router;
