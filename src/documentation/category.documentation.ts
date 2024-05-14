/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *        status:
 *          type: string
 *          default: "ACTIVE"
 *          enum:
 *             - ACTIVE
 *             - INACTIVE
 *        products:
 *          type: array
 *          items:
 *            type: string
 *        childrenCategory:
 *          type: object
 *          properties:
 *              parentId:
 *                type: string
 *              category:
 *                type: array
 *                items:
 *                   $ref: '#/components/schemas/Category'
 *
 *        slug:
 *          type: string
 *        priority:
 *          type: number
 *        visible:
 *          type: boolean
 */
