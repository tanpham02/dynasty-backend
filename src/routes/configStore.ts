import configStoreController from '@app/controllers/configStore';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * '/api/config-store/find':
 *  get:
 *     tags: [Config Store]
 *     summary: Find all
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ConfigStore'
 */

// GET ALL
router.get('/find', configStoreController.getAll);

/**
 * @swagger
 * '/api/config-store/{id}':
 *  patch:
 *     tags: [Config Store]
 *     summary: Update config store
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
 *             $ref: '#/components/schema/ConfigStore'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ConfigStore'
 */

// UPDATE
router.patch('/:id', configStoreController.update);

export default router;
