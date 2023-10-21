"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantSizeType = exports.ProductVariantBaseType = void 0;
// SCHEMAS DESCRIPTION
/**
 * @swagger
 * components:
 *   schemas:
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
 *   schemas:
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
 *                $ref: '#/components/schema/VariantSizeMap'
 *            baseMap:
 *               type: array
 *               item:
 *                 schema:
 *                    $ref: '#/components/schema/VariantBaseMap'
 */
/**
 * @swagger
 * components:
 *   schemas:
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
 *   schemas:
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
var ProductVariantSizeType;
(function (ProductVariantSizeType) {
    ProductVariantSizeType["SMALL"] = "SMALL";
    ProductVariantSizeType["MEDIUM"] = "MEDIUM";
    ProductVariantSizeType["LARGE"] = "LARGE";
})(ProductVariantSizeType || (exports.ProductVariantSizeType = ProductVariantSizeType = {}));
var ProductVariantBaseType;
(function (ProductVariantBaseType) {
    ProductVariantBaseType["PAN"] = "PAN";
    ProductVariantBaseType["CRISPY_THIN"] = "CRISPY_THIN";
    ProductVariantBaseType["EXTREME_CHEESE"] = "EXTREME_CHEESE";
    ProductVariantBaseType["EXTREME_SAUSAGE_CHEESE"] = "EXTREME_SAUSAGE_CHEESE";
})(ProductVariantBaseType || (exports.ProductVariantBaseType = ProductVariantBaseType = {}));
