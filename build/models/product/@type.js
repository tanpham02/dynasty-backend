"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductType = void 0;
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
