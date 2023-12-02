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
 *        status:
 *          type: string
 *          default: "ACTIVE"
 *          enum:
 *             - ACTIVE
 *             - IN_ACTIVE
 *        products:
 *          type: array
 *          items:
 *            type: string
 *
 *        childrenCategory:
 *          type: array
 *          items:
 *             type: object
 *             properties:
 *                parentId:
 *                   type: string
 *                category:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/Category'
 *
 *        priority:
 *          type: number
 *        visible:
 *          type: boolean
 */
var CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: constants_1.ProductStatus,
        default: constants_1.ProductStatus.ACTIVE,
    },
    products: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    priority: {
        type: Number,
    },
    visible: {
        type: Boolean,
    },
}, {
    versionKey: false,
    timestamps: true,
});
var ChildCategorySchema = new mongoose_1.Schema({
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
    },
    category: {
        type: [CategorySchema],
    },
});
CategorySchema.add({ childrenCategory: { type: [ChildCategorySchema] } });
var CategoryModel = (0, mongoose_1.model)('Category', CategorySchema);
exports.default = CategoryModel;
