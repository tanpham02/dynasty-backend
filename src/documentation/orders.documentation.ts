/**
 * @swagger
 * components:
 *   schema:
 *     Orders:
 *       type: object
 *       properties:
 *          customerId:
 *              $ref: '#/components/schema/Customers'
 *          productsFromCart:
 *              $ref: '#/components/schema/Carts'
 *          productsWhenTheCustomerIsNotLoggedIn:
 *              type: array
 *              items:
 *                type: string
 *          _id:
 *              type: string
 *          shipFee:
 *              type: number
 *          totalAmountBeforeUsingDiscount:
 *              type: number
 *          statusOrder:
 *              type: string
 *              enum:
 *                 - PENDING
 *                 - DELIVERING
 *                 - SUCCESS
 *                 - CANCELED
 *                 - WAITING_FOR_DELIVERING
 *                 - WAITING_FOR_PAYMENT
 *              default: 'WAITING_FOR_PAYMENT'
 *          fullName:
 *              type: string
 *          phoneNumber:
 *              type: string
 *          location:
 *              type: string
 *          city:
 *              type: string
 *          cityId:
 *              type: number
 *          district:
 *              type: string
 *          districtId:
 *              type: number
 *          ward:
 *              type: string
 *          wardId:
 *              type: number
 *          typeOrder:
 *              type: string
 *              enum:
 *                 - ORDER_TO_PICK_UP
 *                 - ORDER_DELIVERING
 *              default: 'ORDER_DELIVERING'
 *          paymentMethod:
 *              type: string
 *              enum:
 *                 - PAYMENT_ON_DELIVERY
 *                 - MONO
 *                 - ATM_CARD
 *                 - SHOPEE_PAY
 *                 - ZALO_PAY
 *              default: 'PAYMENT_ON_DELIVERY'
 *          statusCheckout:
 *              type: string
 *              enum:
 *                 - VERIFY_INFORMATION
 *                 - ORDER_CONFIRMATION
 *              default: 'VERIFY_INFORMATION'
 *          orderReceivingTime:
 *              type: string
 *              enum:
 *                 - NOW
 *                 - SELECT_DATE_TIME
 *              default: 'NOW'
 *          dateTimeOrderReceive:
 *             type: string
 *          voucherId:
 *              type: string
 *              description: references to the document Voucher
 *          orderAtStore:
 *              type: string
 *              description: references to the document Shop Store
 *          reasonOrderCancel:
 *              type: string
 *          totalOrder:
 *              type: number
 */
