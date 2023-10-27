import customerAddressController from '@app/controllers/customerAddress';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * '/api/customers/customer-address/find-all':
 *  get:
 *     tags: [Customer Address]
 *     summary: Find all
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/CustomerAddressList'
 */

// FIND ALL
router.get('/customer-address/find-all', customerAddressController.findAll);

/**
 * @swagger
 * '/api/customers/customer-address/{customerId}':
 *  get:
 *     tags: [Customer Address]
 *     summary: Find by id
 *     parameters:
 *       - in: path
 *         name: customerId
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
 *                 $ref: '#/components/schema/CustomerAddressList'
 */

// GET ITEM ADDRESS BY ID
router.get('/customer-address/:customerId', customerAddressController.getListAddressByCustomerId);

/**
 * @swagger
 * '/api/customers/customer-address/add':
 *  patch:
 *     tags: [Customer Address]
 *     summary: Add item address
 *     parameters:
 *       - in: query
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/CustomerAddressItem'
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/CustomerAddressList'
 */

// ADD ITEM ADDRESS
router.patch('/customer-address/add', customerAddressController.addAddress);

/**
 * @swagger
 * '/api/customers/customer-address/{itemAddressId}':
 *  patch:
 *     tags: [Customer Address]
 *     summary: Update item address
 *     parameters:
 *       - in: path
 *         name: itemAddressId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/CustomerAddressItem'

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/CustomerAddressList'
 */

// UPDATE ITEM ADDRESS
router.patch('/customer-address/:itemAddressId', customerAddressController.update);

/**
 * @swagger
 * '/api/customers/customer-address/{itemAddressId}':
 *  delete:
 *     tags: [Customer Address]
 *     summary: Delete item address
 *     parameters:
 *       - in: path
 *         name: itemAddressId
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
 *                 $ref: '#/components/schema/CustomerAddressList'
 */

// DELETE ITEM ADDRESS
router.delete('/customer-address/:itemAddressId', customerAddressController.deleteItem);

/**
 * @swagger
 * '/api/customers/customer-address':
 *  delete:
 *     tags: [Customer Address]
 *     summary: Delete list address
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *         required: true
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/CustomerAddressList'
 */

// DELETE  ADDRESS
router.delete('/customer-address', customerAddressController.delete);

export default router;
