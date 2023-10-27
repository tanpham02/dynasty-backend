"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// SCHEMAS RESPONSE
/**
 * @swagger
 * components:
 *   schema:
 *     CustomerAddressItem:
 *       type: object
 *       properties:
 *         city:
 *             type: string
 *         cityId:
 *             type: number
 *         district:
 *             type: string
 *         districtId:
 *             type: number
 *         ward:
 *             type: string
 *         wardId:
 *             type: number
 *         address:
 *             type: string
 *         fullName:
 *             type: string
 *         phoneNumber:
 *             type: string
 *         isDefault:
 *             type: boolean
 *             default: false
 */
/**
 * @swagger
 * components:
 *   schema:
 *     CustomerAddressList:
 *       type: object
 *       properties:
 *         customerId:
 *            type: string
 *         addressList:
 *          type: array
 *          items:
 *             schema:
 *                $ref: '#/components/schema/CustomerAddressItem'
 */
var CustomerAddressSchema = new mongoose_1.Schema({
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    addressList: [
        {
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
            fullName: {
                type: String,
            },
            address: {
                type: String,
            },
            phoneNumber: {
                type: String,
            },
            isDefault: {
                type: Boolean,
                default: false,
            },
        },
    ],
}, { versionKey: false, timestamps: true });
var CustomerAddressModel = (0, mongoose_1.model)('CustomerAddress', CustomerAddressSchema);
exports.default = CustomerAddressModel;
