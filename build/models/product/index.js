"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var _type_1 = require("./@type");
var constants_1 = require("@app/constants");
// RESPONSE  DESCRIPTION
/**
 * @swagger
 * components:
 *   schema:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         categoryId:
 *           type: string
 *         price:
 *           type: number
 *         oldPrice:
 *           type: number
 *         description:
 *           type: string
 *         information:
 *           type: string
 *         image:
 *           type: string
 *         orderQuantity:
 *           type: number
 *         status:
 *           type: string
 *           enum:
 *              - ACTIVE
 *              - IN_ACTIVE
 *         types:
 *           type: array
 *           enum:
 *              - NORMAL
 *              - NEW
 *              - BEST_SELLER
 *              - DELICIOUS_MUST_TRY
 *              - VEGETARIAN
 *              - SPICY
 *         productVariantId:
 *           type: string
 */
var ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    information: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    oldPrice: {
        type: Number,
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
    },
    image: {
        type: String,
    },
    images: {
        type: [String],
    },
    status: {
        type: String,
        enum: constants_1.ProductStatus,
        default: constants_1.ProductStatus.ACTIVE,
    },
    types: {
        type: [String],
        enum: _type_1.ProductType,
        default: [_type_1.ProductType.NORMAL],
    },
    orderQuantity: {
        type: Number,
    },
    visible: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
ProductSchema.add({
    attribute: [
        {
            attributeName: {
                type: String,
            },
            attributeList: [
                {
                    name: {
                        type: String,
                    },
                    value: {
                        type: String,
                    },
                    priceAdjustment: {
                        type: String,
                    },
                    priceAdjustmentValue: {
                        type: Number,
                    },
                },
            ],
            productVariantList: [ProductSchema],
        },
    ],
});
var ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
exports.default = ProductModel;
