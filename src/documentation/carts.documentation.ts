/**
 * @swagger
 * components:
 *   schemas:
 *     Carts:
 *       type: object
 *       required:
 *         - customerId
 *         - products
 *       properties:
 *         customerId:
 *           type: string
 *         products:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  product:
 *                     $ref: '#/components/schema/Products'
 *                  note:
 *                     type: string
 *                  productQuantities:
 *                     type: number
 *         quantities:
 *           type: number
 *         total:
 *           type: number
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartDTO:
 *       type: object
 *       properties:
 *           product:
 *              type: string
 *           note:
 *              type: string
 *           productQuantities:
 *              type: number
 */
