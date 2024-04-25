/**
 * @swagger
 * components:
 *   schema:
 *     Voucher:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - code
 *         - startDate
 *         - endDate
 *         - saleScope
 *         - promotionType
 *         - discount
 *         - discountPercent
 *         - maximumReducedAmountMoney
 *         - totalQuantityVoucher
 *         - maxQuantityUseInUser
 *         - minimumOrderValue
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         code:
 *             type: string
 *         startDate:
 *           type: date
 *           description: VD 2023-09-09T22:25:17
 *         endDate:
 *           type: date
 *           description: VD 2023-09-09T22:25:17
 *         saleScope:
 *           type: string
 *           enum:
 *               - ALL
 *               - BY_PRODUCT
 *         promotionType:
 *             type: string
 *             enum:
 *                 - DISCOUNT_BY_MONEY
 *                 - DISCOUNT_BY_PERCENT
 *         discount:
 *           type: number
 *         discountPercent:
 *             type: number
 *         maximumReducedAmountMoney:
 *           type: number
 *         totalQuantityVoucher:
 *             type: string
 *         maxQuantityUseInUser:
 *           type: number
 *         minimumOrderValue:
 *           type: string
 *         customerIdsUsedVoucher:
 *           type: array
 *           items:
 *              type: string
 *         listProductUsedVoucher:
 *           type: array
 *           items:
 *              $ref: '#/components/schema/Products'
 */
