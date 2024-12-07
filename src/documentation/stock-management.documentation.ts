/**
 * @swagger
 * components:
 *   schemas:
 *     StockManagements:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           description: VD 2023-09-15
 *         type:
 *           type: string
 *           enum:
 *               - IMPORT
 *               - EXPORT
 *         stockManagementInfo:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                    type: string
 *                 price:
 *                    type: number
 *                 quantity:
 *                    type: number
 *                 unit:
 *                    type: string
 *         totalPrice:
 *           type: number
 *         note:
 *           type: string
 */
