"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionSchema = void 0;
var mongoose_1 = require("mongoose");
// SCHEMAS RESPONSE
/**
 * @swagger
 * components:
 *   schema:
 *     Promotions:
 *       type: object
 *       properties:
 *         name:
 *             type: string
 *         description:
 *             type: string
 *         banner:
 *             type: string
 *         promotionsList:
 *             type: array
 *             item:
 *                schema:
 *                    $ref: '#/components/schema/Product'
 */
var PromotionSchemaList = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
    },
    productIsPurchasedId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
    },
    productDonatedId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
    },
    price: {
        type: Number,
    },
    size: {
        type: String,
    },
    base: {
        type: String,
    },
    image: {
        type: String,
    },
}, { timestamps: true, versionKey: false });
var PromotionSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    banner: {
        type: String,
    },
    promotionsList: [PromotionSchemaList],
}, { timestamps: true, versionKey: false });
exports.PromotionSchema = PromotionSchema;
var PromotionsModel = (0, mongoose_1.model)('Promotions', PromotionSchema);
exports.default = PromotionsModel;
