import configStoreController from '@app/controllers/configStore';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * '/api/config-store/search':
 *  get:
 *     tags: [Config Store]
 *     summary: Search
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/ConfigStore'
 */

// SEARCH
router.get('/search', configStoreController.search);

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

// CREATE
router.patch('/:id', configStoreController.updateOverriding);

export default router;
