/**
 * @swagger
 * components:
 *   schemas:
 *      Salary:
 *         allOf:
 *            - $ref: '#/components/schemas/BaseModel'
 *         type: object
 *         required:
 *            - value
 *            - staffId
 *         properties:
 *            staffId:
 *                type: string
 *            value:
 *                type: number
 *            isPayment:
 *                type: boolean
 *            note:
 *                type: string
 */
