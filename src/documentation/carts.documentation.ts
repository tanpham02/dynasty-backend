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
 *                     $ref: '#/components/schema/Product'
 *                     description: This is field ObjectId (Use populate to retries data)
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
 *              description: This is field ObjectId (Use populate to retries data)
 *           note:
 *              type: string
 *           productQuantities:
 *              type: number
 */
