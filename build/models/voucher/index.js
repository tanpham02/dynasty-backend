"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var _type_1 = require("./@type");
var constants_1 = require("@app/constants");
// SCHEMAS DESCRIPTION
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
 *             type: string
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
 *              $ref: '#/components/schema/Product'
 */
var voucherSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    startDate: {
        // *************
        type: Date,
        required: true,
    },
    endDate: {
        // *************
        type: Date,
        required: true,
    },
    saleScope: {
        type: String,
        enum: _type_1.SaleScope,
    },
    promotionType: {
        type: String,
        enum: _type_1.PromotionsType,
    },
    discount: {
        type: Number,
    },
    discountPercent: {
        type: Number,
    },
    maximumReducedAmountMoney: {
        type: Number,
    },
    totalQuantityVoucher: {
        type: Number,
    },
    minimumOrderValue: {
        type: Number,
    },
    listProductUsedVoucher: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    status: {
        type: String,
        enum: constants_1.Status,
        default: constants_1.Status.ACTIVE,
    },
    customerIdsUsedVoucher: [
        {
            type: [String],
        },
    ],
}, { timestamps: true, versionKey: false });
var VoucherModel = (0, mongoose_1.model)('Voucher', voucherSchema);
exports.default = VoucherModel;
