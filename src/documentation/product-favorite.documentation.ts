/**
 * @swagger
 * components:
 *   schema:
 *     ProductFavorite:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         customerId:
 *             $ref: '#/components/schema/Customers'
 *         products:
 *             type: array
 *             items:
 *                $ref: '#/components/schema/Products'
 */
