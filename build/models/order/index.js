"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var _type_1 = require("./@type");
var cart_1 = require("../cart");
// SCHEMAS RESPONSE
/**
 * @swagger
 * components:
 *   schema:
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
 *          systemStoreId:
 *              $ref: '#/components/schema/Shop System'
 */
var OrderSchema = new mongoose_1.Schema({
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    productFromCart: {
        type: cart_1.CartSchema,
    },
    shipFee: {
        type: Number,
    },
    totalOrderAmountBeforeUseDiscount: {
        type: Number,
    },
    statusOrder: {
        type: String,
        enum: _type_1.StatusOrder,
        default: _type_1.StatusOrder.PENDING,
    },
    fullName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    cityId: {
        type: Number,
    },
    district: {
        type: String,
    },
    districtId: {
        type: Number,
    },
    ward: {
        type: String,
    },
    wardId: {
        type: Number,
    },
    totalOrder: {
        type: Number,
    },
    typeOrder: {
        type: String,
        enum: _type_1.TypeOrder,
    },
    timeOrder: {
        type: String,
        enum: _type_1.TimeOrder,
    },
    dateSelect: {
        type: Date,
    },
    timeSelect: {
        type: Date,
    },
    voucherId: {
        type: String,
    },
    systemStoreId: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    reasonCancelOrder: {
        type: String,
    },
}, {
    versionKey: false,
});
var OrderModel = (0, mongoose_1.model)('Order', OrderSchema);
exports.default = OrderModel;
