"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var constants_1 = require("@app/constants");
// RESPONSE DESCRIPTION
/**
 * @swagger
 * components:
 *  schema:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          default: ""
 *        status:
 *          type: string
 *          default: ""
 *          enum:
 *             - ACTIVE
 *             - IN_ACTIVE
 *        productsDTO:
 *          type: array
 *          item:
 *             $ref: '#/components/schema/Product'
 *
 *        comboPromotionsId:
 *             type: array
 *             item:
 *                 $ref: '#/components/schema/ComboPromotions'
 *
 *        childCategory:
 *          type: array
 *          item:
 *             $ref: '#/components/schema/Category'
 */
/**
 * @swagger
 * components:
 *  schema:
 *    ChildrenCategory:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *        parentId:
 *          type: string
 *          item:
 *             $ref: '#/components/schema/Category'
 *
 *        childCategory:
 *          type: array
 *          item:
 *             $ref: '#/components/schema/ChildrenCategory'
 */
/**
 * @swagger
 * components:
 *  schema:
 *    ChildCategory:
 *      type: object
 *      properties:
 *        children:
 *              $ref: '#/components/schema/Category'
 */
var CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: constants_1.Status,
        default: constants_1.Status.ACTIVE,
    },
    comboPromotionsId: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'ComboPromotions',
        },
    ],
    productsDTO: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
}, {
    versionKey: false,
    timestamps: true,
});
var ChildCategorySchema = new mongoose_1.Schema({
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
    },
    children: {
        type: CategorySchema,
    },
});
CategorySchema.add({ childCategory: { type: [ChildCategorySchema] } });
var CategoryModel = (0, mongoose_1.model)('Category', CategorySchema);
exports.default = CategoryModel;
