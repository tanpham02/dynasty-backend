/**
 * @swagger
 * components:
 *   schemas:
 *     ProductFavorite:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         customerId:
 *             $ref: '#/components/schemas/Customers'
 *         products:
 *             type: array
 *             items:
 *                $ref: '#/components/schemas/Products'
 */
