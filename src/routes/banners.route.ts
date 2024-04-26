import { bannerController } from '@app/controllers';
import { verifyToken } from '@app/middlewares';
import { uploadFile } from '@app/middlewares';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * '/api/banners/search':
 *  get:
 *     tags: [Banners]
 *     summary: Search all
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Banners'
 */

// SEARCH ALL
router.get('/search', verifyToken, bannerController.searchAll);

/**
 * @swagger
 * '/api/banners':
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Banners]
 *     summary: Create
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *                type: object
 *                properties:
 *                   bannerInfo:
 *                        $ref: '#/components/schemas/Banners'
 *                   file:
 *                        type: string
 *                        format: binary
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Banners'
 */

// CREATE
router.post('/', uploadFile('banners').single('file'), bannerController.create);

/**
 * @swagger
 * '/api/banners/{id}':
 *  patch:
 *     security:
 *       - bearerAuth: []
 *     tags: [Banners]
 *     summary: Update
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *                type: object
 *                properties:
 *                   bannerInfo:
 *                        $ref: '#/components/schemas/Banners'
 *                   file:
 *                        type: string
 *                        format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Banners'
 */

// UPDATE VOUCHER
router.patch('/:id', uploadFile('banners').single('file'), bannerController.update);

/**
 * @swagger
 * '/api/banners/{id}':
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Banners]
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
 *                 $ref: '#/components/schema/Banners'
 */

// GET BY ID
router.get('/:id', bannerController.getById);

/**
 * @swagger
 * '/api/banners':
 *  delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Banners]
 *     summary: Delete banner
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
 *                 $ref: '#/components/schema/Banners'
 */

// DELETE
router.delete('/', bannerController.delete);

export default router;
