import bannerController from '@app/controllers/banners';
import { uploadFileBanner } from '@app/services/upload';
import { Router } from 'express';
const router = Router();

/**
 * @swagger
 * '/api/banners/search':
 *  get:
 *     tags: [Banners]
 *     summary: Search pagination
 *     parameters:
 *      - name: name
 *        in: query
 *        schema:
 *          type: string
 *      - name: sort
 *        in: query
 *        schema:
 *          type: string
 *        description: Allow value 1 | -1
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

// SEARCH PAGINATION
router.get('/search', bannerController.search);

/**
 * @swagger
 * '/api/banners':
 *  post:
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
 *                        type: array
 *                        items:
 *                            $ref: '#/components/schema/Banners'
 *                   files:
 *                        type: array
 *                        items:
 *                           type: string
 *                           format: binary
 *
 *           encoding:
 *              bannerInfo:
 *                  contentType: application/json
 *                  explode: true
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Banners'
 */

// CREATE
router.post('/', uploadFileBanner, bannerController.create);

/**
 * @swagger
 * '/api/banners/{id}':
 *  patch:
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
 *                      $ref: '#/components/schema/Banners'
 *                   files:
 *                      type: string
 *                      format: binary
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/Banners'
 */

// UPDATE VOUCHER
router.patch('/:id', uploadFileBanner, bannerController.update);

/**
 * @swagger
 * '/api/banners/{id}':
 *  get:
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
 *     tags: [Banners]
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
 *                 $ref: '#/components/schema/Banners'
 */

// DELETE
router.delete('/', bannerController.delete);

export default router;
