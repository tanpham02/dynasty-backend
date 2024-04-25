/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerAddressDTO:
 *       type: object
 *       properties:
 *         customerId:
 *            type: string
 *         addressItem:
 *            allOf:
 *              - $ref: '#/components/schemas/LocationBase'
 *            type: object
 *            properties:
 *              fullName:
 *                  type: string
 *              phoneNumber:
 *                  type: string
 *              isDefault:
 *                  type: boolean
 *                  default: false
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerAddress:
 *       type: object
 *       properties:
 *         customerId:
 *            type: string
 *         addressList:
 *          type: array
 *          items:
 *            allOf:
 *               - $ref: '#/components/schemas/LocationBase'
 *            type: object
 *            properties:
 *              fullName:
 *                  type: string
 *              phoneNumber:
 *                  type: string
 *              isDefault:
 *                  type: boolean
 *                  default: false
 */
