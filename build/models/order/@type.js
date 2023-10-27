"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOrder = exports.TypeOrder = exports.StatusOrder = void 0;
// SCHEMAS DESCRIPTION
/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *          customerId:
 *              $ref: '#/components/schema/Customer'
 *          productFromCart:
 *                 $ref: '#/components/schema/Cart'
 *          shipFee:
 *              type: number
 *          totalOrderAmountBeforeUseDiscount:
 *              type: number
 *          statusOrder:
 *              type: string
 *              enum:
 *                 - PENDING
 *                 - DELIVERING
 *                 - SUCCESS
 *                 - FAIL
 *                 - QUICK_BUY
 *                 - CANCELED
 *                 - WAITING_FOR_DELIVERING
 *              default: 'PENDING'
 *          fullName:
 *              type: string
 *          phoneNumber:
 *              type: string
 *          address:
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
 *          totalOrder:
 *              type: number
 *          reasonCancelOrder:
 *              type: string
 *          typeOrder:
 *              type: string
 *              enum:
 *                 - ORDER_TO_PICK_UP
 *                 - ORDER_DELIVERING
 *              default: 'ORDER_DELIVERING'
 *          timeOrder:
 *              type: string
 *              enum:
 *                 - NOW
 *                 - SELECT_DATE_TIME
 *              default: 'NOW'
 *          voucherId:
 *              $ref: '#/components/schema/Voucher'
 */
var StatusOrder;
(function (StatusOrder) {
    StatusOrder["PENDING"] = "PENDING";
    StatusOrder["DELIVERING"] = "DELIVERING";
    StatusOrder["FAIL"] = "FAIL";
    StatusOrder["CANCELED"] = "CANCELED";
    StatusOrder["SUCCESS"] = "SUCCESS";
    StatusOrder["WAITING_FOR_DELIVERING"] = "WAITING_FOR_DELIVERING";
})(StatusOrder || (exports.StatusOrder = StatusOrder = {}));
var TypeOrder;
(function (TypeOrder) {
    TypeOrder["ORDER_TO_PICK_UP"] = "ORDER_TO_PICK_UP";
    TypeOrder["ORDER_DELIVERING"] = "ORDER_DELIVERING";
})(TypeOrder || (exports.TypeOrder = TypeOrder = {}));
var TimeOrder;
(function (TimeOrder) {
    TimeOrder["NOW"] = "NOW";
    TimeOrder["SELECT_DATE_TIME"] = "SELECT_DATE_TIME";
})(TimeOrder || (exports.TimeOrder = TimeOrder = {}));
