import { FIELDS_NAME } from '@app/constants';
import customerAddressController from '@app/controllers/customerAddress';
import { formDataParser } from '@app/utils/formDataParser';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * '/api/customers/customer-address/{customerId}':
 *  get:
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
 *                 $ref: '#/components/schema/CustomerAddress'
 */

// GET CUSTOMER ADDRESS BY ID
router.get(
  '/customer-address/:customerId',
  customerAddressController.getCustomerAddressByCustomerId,
);

/**
 * @swagger
 * '/api/customers/customer-address':
 *  post:
 *     tags: [Customers Address]
 *     summary: Add customer address item
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   customerAddressInfo:
 *                        $ref: '#/components/schemas/CustomerAddressDTO'

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/CustomerAddress'
 */

// ADD CUSTOMER ADDRESS ITEM
router.post(
  '/customer-address',
  formDataParser(FIELDS_NAME.CUSTOMER_ADDRESS),
  customerAddressController.addCustomerAddressItem,
);

/**
 * @swagger
 * '/api/customers/customer-address/{customerAddressItemId}':
 *  patch:
 *     tags: [Customers Address]
 *     summary: Update customer address item
 *     parameters:
 *       - in: path
 *         name: customerAddressItemId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   customerAddressInfo:
 *                        $ref: '#/components/schemas/CustomerAddressDTO'

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schema/CustomerAddress'
 */

// UPDATE CUSTOMER ADDRESS ITEM
router.patch(
  '/customer-address/:customerAddressItemId',
  formDataParser(FIELDS_NAME.CUSTOMER_ADDRESS),
  customerAddressController.updateCustomerAddressItem,
);

/**
 * @swagger
 * '/api/customers/customer-address/{customerAddressItemId}':
 *  delete:
 *     tags: [Customers Address]
 *     summary: Delete item address
 *     parameters:
 *       - in: path
 *         name: customerAddressItemId
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
router.delete(
  '/customer-address/:customerAddressItemId',
  customerAddressController.deleteCustomerAddressItem,
);

export default router;
