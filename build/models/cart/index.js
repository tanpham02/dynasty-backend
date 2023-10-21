"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSchema = void 0;
var mongoose_1 = require("mongoose");
// SCHEMAS RESPONSE
/**
 * @swagger
 * components:
 *   schema:
 *     Cart:
 *       type: object
 *       required:
 *         - customerId
 *         - products
 *       properties:
 *         customerId:
 *           type: string
 *         products:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  productId:
 *                     type: string
 *                  note:
 *                     type: string
 *                  quantityProducts:
 *                     type: number
 *         quantity:
 *           type: number
 *         totalCart:
 *           type: number
 */
/**
 * @swagger
 * components:
 *   schema:
 *     CartRequest:
 *       type: object
 *       properties:
 *         products:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              note:
 *                type: string
 *              productId:
 *                type: string
 *              quantityProducts:
 *                type: number
 *              actionType:
 *                type: string
 *                enum:
 *                   - ADD
 *                   - UPDATE
 *                   - DELETE
 */
var CartProductSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
    },
    note: {
        type: String,
    },
    quantityProducts: {
        type: Number,
    },
}, { versionKey: false, timestamps: true });
var CartSchema = new mongoose_1.Schema({
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    products: [CartProductSchema],
    quantity: {
        type: Number,
    },
    totalCart: {
        type: Number,
    },
}, { versionKey: false, timestamps: true });
exports.CartSchema = CartSchema;
var CartModel = (0, mongoose_1.model)('Cart', CartSchema);
exports.default = CartModel;
