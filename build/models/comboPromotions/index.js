"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboPromotionsSchema = void 0;
var mongoose_1 = require("mongoose");
/**
 * @swagger
 * components:
 *   schema:
 *     ComboPromotions:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *             type: string
 *         categoryId:
 *             type: string
 *         comboPrice:
 *             type: number
 *         image:
 *             type: string
 *         productId:
 *             type: array
 *             item:
 *                schema:
 *                    $ref: '#/components/schema/Product'
 */
var ComboPromotionsSchema = new mongoose_1.Schema({
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
    },
    productId: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    name: {
        type: String,
        unique: true,
    },
    comboPrice: {
        type: Number,
    },
    image: {
        type: String,
    },
}, { timestamps: true, versionKey: false });
exports.ComboPromotionsSchema = ComboPromotionsSchema;
var ComboPromotionsModel = (0, mongoose_1.model)('ComboPromotions', ComboPromotionsSchema);
exports.default = ComboPromotionsModel;
