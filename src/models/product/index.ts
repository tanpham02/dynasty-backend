import { Schema, model } from 'mongoose';
import { Product, ProductType } from './@type';
import { Status } from '@app/constants';
import ProductVariantsModel from '../productVariant';

/**
 * @swagger
 * components:
 *  schema:
 *    Product:
 *      type: object
 *      required:
 *        - name
 *        - timestamps
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
 */

const ProductSchema = new Schema<Product>(
  {
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
    importPrice: {
      type: Number,
    },
    image: {
      type: String,
    },
    images: {
      type: [String],
    },
    status: {
      type: String,
      enum: Status,
      default: Status.ACTIVE,
    },
    types: {
      type: String,
      enum: ProductType,
      default: ProductType.NORMAL,
    },
    orderQuantity: {
      type: Number,
    },
    productVariantsId: {
      type: Schema.Types.ObjectId,
      ref: 'ProductVariantsModel',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

ProductSchema.add({
  productVariantsResponse: {
    type: [ProductVariantsModel],
  },
});

const ProductModel = model('Product', ProductSchema);

export default ProductModel;
