import voucherController from '@app/controllers/vouchers.controller';
import { Router } from 'express';
const router = Router();

/**
 * @swagger
 * '/api/vouchers/search':
 *  get:
 *     tags: [Vouchers]
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
 *                 $ref: '#/components/schema/Voucher'
 */

// SEARCH PAGINATION VOUCHER
router.get('/search', voucherController.search);

/**
 * @swagger
 * '/api/vouchers/create':
 *  post:
 *     tags: [Vouchers]
 *     summary: Create voucher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Voucher'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Voucher'
 */

// CREATE VOUCHER
router.post('/create', voucherController.create);

/**
 * @swagger
 * '/api/vouchers/{id}':
 *  patch:
 *     tags: [Vouchers]
 *     summary: Update voucher
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
 *             $ref: '#/components/schema/Voucher'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Voucher'
 */

// UPDATE VOUCHER
router.patch('/:id', voucherController.update);

/**
 * @swagger
 * '/api/vouchers/{id}':
 *  get:
 *     tags: [Vouchers]
 *     summary: Get voucher by id
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
 *                 $ref: '#/components/schema/Voucher'
 */

// GET VOUCHER BY ID
router.get('/:id', voucherController.getById);

/**
 * @swagger
 * '/api/vouchers':
 *  delete:
 *     tags: [Vouchers]
 *     summary: Delete voucher
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
 *                 $ref: '#/components/schema/Voucher'
 */

// GET VOUCHER BY ID
router.delete('/', voucherController.delete);

export default router;
