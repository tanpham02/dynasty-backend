"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// SCHEMA RESPONSE
/**
 * @swagger
 * components:
 *   schema:
 *     ConfigStore:
 *       type: object
 *       properties:
 *         brandStore:
 *             type: string
 *         memberPolicies:
 *             type: string
 *         deliveryPolicy:
 *             type: string
 *         privatePolicy:
 *             type: string
 *         termAndCondition:
 *             type: string
 *         feeShip:
 *             type: number
 *         recruitment:
 *             type: string
 *         howIsOrder:
 *             type: string
 *         reasonOrderCancel:
 *             type: array
 *             items:
 *               type: string
 *         hotlineSupport:
 *             type: object
 *             properties:
 *                order:
 *                   type: string
 *                customerCareHotline:
 *                   type: string
 *         representOffice:
 *             type: object
 *             properties:
 *                name:
 *                   type: string
 *                address:
 *                   type: string
 *                phoneNumber:
 *                   type: string
 *         linkWithUs:
 *             type: object
 *             properties:
 *                facebook:
 *                   type: string
 *                instagram:
 *                   type: string
 */
var ConfigStoreSchema = new mongoose_1.Schema({
    brandStore: {
        type: String,
    },
    memberPolicies: {
        type: String,
    },
    deliveryPolicy: {
        type: String,
    },
    privatePolicy: {
        type: String,
    },
    termAndCondition: {
        type: String,
    },
    recruitment: {
        type: String,
    },
    feeShip: {
        type: Number,
    },
    howIsOrder: {
        type: Number,
    },
    reasonOrderCancel: {
        type: [String],
    },
    hotlineSupport: {
        order: {
            type: String,
        },
        customerCareHotline: {
            type: String,
        },
    },
    representOffice: {
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
    },
    linkWithUs: {
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
}, { timestamps: true, versionKey: false });
var ConfigStoreModel = (0, mongoose_1.model)('ConfigStore', ConfigStoreSchema);
exports.default = ConfigStoreModel;
