import { FIELDS_NAME } from '@app/constants/app';
import customerAddressController from '@app/controllers/customer-address.controller';
import { verifyToken } from '@app/middlewares';
import { formDataParser } from '@app/utils/form-data-parser.util';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * '/api/customers/customer-address/{customerId}':
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Customers Address]
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
 *                 $ref: '#/components/schemas/CustomerAddress'
 */

// GET CUSTOMER ADDRESS BY ID
router.get('/:customerId', verifyToken, customerAddressController.getCustomerAddressByCustomerId);

/**
 * @swagger
 * '/api/customers/customer-address/{addressItemId}':
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Customers Address]
 *     summary: Get customer address item
 *     parameters:
 *       - in: path
 *         name: addressItemId
 *         schema:
 *            type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/CustomerAddress'
 */

// GET CUSTOMER ADDRESS ITEM
router.get('/:addressItemId', verifyToken, customerAddressController.getCustomerAddressItem);

/**
 * @swagger
 * '/api/customers/customer-address':
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Customers Address]
 *     summary: Add customer address item
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 $ref: '#/components/schemas/CustomerAddressRequest'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/CustomerAddress'
 */

// ADD CUSTOMER ADDRESS ITEM
router.post('/', verifyToken, customerAddressController.addCustomerAddressItem);

/**
 * @swagger
 * '/api/customers/customer-address/{addressItemId}':
 *  patch:
 *     security:
 *       - bearerAuth: []
 *     tags: [Customers Address]
 *     summary: Update customer address item
 *     parameters:
 *       - in: path
 *         name: addressItemId
 *         schema:
 *            type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 $ref: '#/components/schemas/CustomerAddressRequest'

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/CustomerAddress'
 */

// UPDATE CUSTOMER ADDRESS ITEM
router.patch('/:addressItemId', verifyToken, customerAddressController.updateCustomerAddressItem);

/**
 * @swagger
 * '/api/customers/customer-address':
 *  delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Customers Address]
 *     summary: Delete item address
 *     parameters:
 *       - in: query
 *         name: addressItemIds
 *         schema:
 *           type: array
 *           items:
 *              type: string
 *         required: true
 *       - in: query
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
 *                 $ref: '#/components/schema/CustomerAddress'
 */

// DELETE CUSTOMER ADDRESS ITEM
router.delete('/', verifyToken, customerAddressController.deleteCustomerAddressItem);

export default router;
