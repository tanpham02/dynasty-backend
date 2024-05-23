/**
 * @swagger
 * components:
 *   schemas:
 *     ProductAttribute:
 *       type: object
 *       required:
 *         - name
 *         - categoryId
 *       properties:
 *         categoryId:
 *              schema:
 *                  $ref: '#/components/schemas/Category'
 *         name:
 *           type: string
 *         attributeList:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  label:
 *                     type: string
 */
