/**
 * @swagger
 * components:
 *   schema:
 *     Promotions:
 *       type: object
 *       properties:
 *         name:
 *             type: string
 *         description:
 *             type: string
 *         banner:
 *             type: string
 *         promotionsList:
 *             type: array
 *             item:
 *                schema:
 *                    $ref: '#/components/schema/Products'
 */
