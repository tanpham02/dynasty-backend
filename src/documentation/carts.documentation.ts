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
 *                  _id:
 *                     type: string
 *                  product:
 *                     $ref: '#/components/schemas/Products'
 *                  note:
 *                     type: string
 *                  quantity:
 *                     type: number
 *         quantity:
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
 *           _id:
 *              type: string
 *           product:
 *              type: string
 *           note:
 *              type: string
 *           quantity:
 *              type: number
 */
