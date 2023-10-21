"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// SCHEMAS RESPONSE
/**
 * @swagger
 * components:
 *   schema:
 *     Material:
 *       type: object
 *       properties:
 *         importDate:
 *           type: string
 *           description: VD 2023-09-15
 *         materialInfo:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                    type: string
 *                 price:
 *                    type: number
 *                 quantity:
 *                    type: string
 *         totalPrice:
 *           type: number
 */
var MaterialInformationSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: String,
    },
}, { timestamps: true, versionKey: false });
var MaterialSchema = new mongoose_1.Schema({
    importDate: {
        type: Date,
    },
    materialInfo: {
        type: [MaterialInformationSchema],
    },
    totalPrice: {
        type: Number,
    },
}, { timestamps: true, versionKey: false });
var MaterialMode = (0, mongoose_1.model)('Material', MaterialSchema);
exports.default = MaterialMode;
