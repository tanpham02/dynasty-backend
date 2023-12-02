"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var constants_1 = require("@app/constants");
// SCHEMAS DESCRIPTION
/**
 * @swagger
 * components:
 *   schema:
 *     Customer:
 *       type: object
 *       properties:
 *         phoneNumber:
 *             type: string
 *         fullName:
 *             type: string
 *         email:
 *             type: string
 *         password:
 *             type: string
 *         birthday:
 *             type: string
 *             description: 2023-05-25
 *         customerAddressId:
 *             type: string
 *         orderIds:
 *             type: array
 *             items:
 *                type: string
 *         status:
 *          type: string
 *          default: "ACTIVE"
 *          enum:
 *             - ACTIVE
 *             - IN_ACTIVE
 */
var CustomerSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    birthday: {
        type: Date,
    },
    customerAddressId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'CustomerAddress',
    },
    orderIds: [
        {
            type: [String],
        },
    ],
    status: {
        type: String,
        enum: constants_1.ProductStatus,
        default: constants_1.ProductStatus.ACTIVE,
    },
}, { versionKey: false, timestamps: true });
var CustomerModel = (0, mongoose_1.model)('Customer', CustomerSchema);
exports.default = CustomerModel;
