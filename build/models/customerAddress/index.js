"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// SCHEMAS RESPONSE
/**
 * @swagger
 * components:
 *   schema:
 *     CustomerAddressList:
 *       type: object
 *       properties:
 *         city:
 *             type: string
 *         district:
 *             type: string
 *         ward:
 *             type: string
 *         address:
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
 *     CustomerAddress:
 *       type: object
 *       properties:
 *         customerId:
 *            type: string
 *         addressList:
 *          type: array
 *          item:
 *             schema:
 *                $ref: '#/components/schema/CustomerAddressList'
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
