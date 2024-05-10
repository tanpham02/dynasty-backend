/**
 * @swagger
 * components:
 *   schemas:
 *     Orders:
 *       type: object
 *       properties:
 *          customerId:
 *              $ref: '#/components/schemas/Customers'
 *          products:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  product:
 *                      type: string
 *                  note:
 *                      type: string
 *                  quantity:
 *                      type: number
 *          shipFee:
 *              type: number
 *          orderStatus:
 *              type: string
 *              enum: [PENDING, DELIVERING, SUCCESS, CANCELED, WAITING_FOR_DELIVERING, WAITING_FOR_PAYMENT]
 *              default: 'PENDING'
 *          fullName:
 *              type: string
 *          phoneNumber:
 *              type: string
 *          location:
 *              type: string
 *          city:
 *              type: string
 *          cityId:
 *              type: string
 *          district:
 *              type: string
 *          districtId:
 *              type: string
 *          ward:
 *              type: string
 *          wardId:
 *              type: string
 *          orderType:
 *              type: string
 *              enum: [PICK_UP, DELIVERY]
 *              default: 'DELIVERY'
 *          paymentMethod:
 *              type: string
 *              enum: [CASH, MOMO, ATM_CARD, SHOPEE_PAY, ZALO_PAY]
 *              default: 'CASH'
 *          orderReceivingTime:
 *              type: string
 *              enum: [NOW, SELECT_DATE_TIME]
 *              default: 'NOW'
 *          orderReceivingTimeAt:
 *             type: string
 *             format: date-time
 *          voucherId:
 *              type: string
 *          storeId:
 *              type: string
 *          shipperId:
 *              type: string
 *          reasonCancel:
 *              type: string
 *          note:
 *              type: string
 *          subTotal:
 *              type: number
 *          total:
 *              type: number
 */
