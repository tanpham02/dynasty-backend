"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductType = exports.ProductVariantBaseType = exports.ProductVariantSizeType = void 0;
// SCHEMAS DESCRIPTION
/**
 * @swagger
 * components:
 *   schemas:
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
 *         description:
 *           type: string
 *         information:
 *           type: string
 *         image:
 *           type: string
 *         price:
 *           type: number
 *         oldPrice:
 *           type: number
 *         orderQuantity:
 *           type: number
 *         status:
 *           type: string
 *           enum:
 *              - ACTIVE
 *              - IN_ACTIVE
 *           default: "ACTIVE"
 *         types:
 *           type: string
 *           enum:
 *              - NORMAL
 *              - NEW
 *              - BEST_SELLER
 *              - DELICIOUS_MUST_TRY
 *              - VEGETARIAN
 *              - SPICY
 *              - UNIQUE
 *         productVariantId:
 *           type: string
 */
var ProductType;
(function (ProductType) {
    ProductType["NORMAL"] = "NORMAL";
    ProductType["NEW"] = "NEW";
    ProductType["BEST_SELLER"] = "BEST_SELLER";
    ProductType["DELICIOUS_MUST_TRY"] = "DELICIOUS_MUST_TRY";
    ProductType["VEGETARIAN"] = "VEGETARIAN";
    ProductType["SPICY"] = "SPICY";
    ProductType["UNIQUE"] = "UNIQUE";
})(ProductType || (exports.ProductType = ProductType = {}));
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
