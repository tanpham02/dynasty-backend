"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantsSchema = void 0;
var mongoose_1 = require("mongoose");
var _type_1 = require("./@type");
var constants_1 = require("@app/constants");
// RESPONSE DESCRIPTION
/**
 * @swagger
 * components:
 *   schema:
 *     ProductVariant:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         productIds:
 *           type: array
 *           item:
 *              $ref: '#/components/schema/Product'
 *         status:
 *           type: string
 *           enum:
 *              - ACTIVE
 *              - IN_ACTIVE
 *         variants:
 *             type: array
 *             item:
 *                schema:
 *                    $ref: '#/components/schema/ProductVariantChildren'
 */
/**
 * @swagger
 * components:
 *   schema:
 *     ProductVariantChildren:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         types:
 *           type: object
 *         properties:
 *            sizeMap:
 *               $ref: '#/components/schema/VariantSizeMap'
 *            baseMap:
 *               type: array
 *               item:
 *                  schema:
 *                      $ref: '#/components/schema/VariantBaseMap'
 */
/**
 * @swagger
 * components:
 *   schema:
 *     VariantSizeMap:
 *       type: object
 *       properties:
 *          types:
 *             type: object
 *             properties:
 *                sizePriceVariant:
 *                  type: number
 *                size:
 *                  type: string
 *                  enum:
 *                     - SMALL
 *                     - MEDIUM
 *                     - LARGE
 *                  default: 'SMALL'
 */
/**
 * @swagger
 * components:
 *   schema:
 *     VariantBaseMap:
 *       type: object
 *       properties:
 *          typeSizes:
 *             type: object
 *             properties:
 *               basePriceVariant:
 *                   type: number
 *               base:
 *                   type: string
 *                   enum:
 *                      - PAN
 *                      - CRISPY_THIN
 *                      - EXTREME_CHEESE
 *                      - EXTREME_SAUSAGE_CHEESE
 *                   default: 'PAN'
 *
 *
 */
var ProductVariantBaseMap = new mongoose_1.Schema({
    base: {
        type: String,
        enum: _type_1.ProductVariantBaseType,
        default: _type_1.ProductVariantBaseType.PAN,
    },
    basePriceVariant: {
        type: Number,
    },
}, {
    versionKey: false,
    timestamps: true,
});
var ProductVariantSizeMap = new mongoose_1.Schema({
    sizePriceVariant: {
        type: Number,
    },
    size: {
        type: String,
        enum: _type_1.ProductVariantSizeType,
        default: _type_1.ProductVariantSizeType.SMALL,
    },
}, {
    versionKey: false,
    timestamps: true,
});
var ProductVariantSchema = new mongoose_1.Schema({
    types: {
        sizeMap: ProductVariantSizeMap,
        baseMap: [ProductVariantBaseMap],
    },
}, {
    versionKey: false,
    timestamps: true,
});
var ProductVariantsSchema = new mongoose_1.Schema({
    productIds: [
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
    variants: {
        type: [ProductVariantSchema],
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.ProductVariantsSchema = ProductVariantsSchema;
var ProductVariantsModel = (0, mongoose_1.model)('ProductVariant', ProductVariantsSchema);
exports.default = ProductVariantsModel;
