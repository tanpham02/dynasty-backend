/**
 * @swagger
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         categoryId:
 *           type: string
 *         description:
 *           type: string
 *         information:
 *           type: string
 *         image:
 *           type: string
 *         price:
 *           type: number
 *         oldPrice:
 *           type: number
 *         orderQuantity:
 *           type: number
 *         status:
 *           type: string
 *           enum:
 *              - ACTIVE
 *              - INACTIVE
 *           default: "ACTIVE"
 *         types:
 *           type: array
 *           items:
 *              type: string
 *              enum:
 *                 - NORMAL
 *                 - NEW
 *                 - BEST_SELLER
 *                 - DELICIOUS_MUST_TRY
 *                 - VEGETARIAN
 *                 - SPICY
 *                 - UNIQUE
 *         productAttributeList:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                extendedIds:
 *                   type: array
 *                   items:
 *                      type: string
 *                priceAdjustmentValue:
 *                   type: number
 *         productsVariant:
 *           type: array
 *           items:
 *              type: string
 *         visible:
 *           type: boolean
 */
