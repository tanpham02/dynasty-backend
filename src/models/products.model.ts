import { Schema, model } from 'mongoose';

import { Product, ProductType, Status } from '@app/types';

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
    categoryId: {
      type: Schema.Types.ObjectId,
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
      enum: Status,
      default: Status.ACTIVE,
    },
    types: {
      type: [String],
      enum: ProductType,
      default: [ProductType.NORMAL],
    },
    orderQuantity: {
      type: Number,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    productAttributeList: [
      {
        extendedIds: {
          type: [String],
        },
        priceAdjustmentValues: {
          type: [Number],
        },
      },
    ],
    productsVariant: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ProductVariant',
      },
    ],
    slug: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const ProductModel = model('Product', ProductSchema);

export default ProductModel;
export { ProductSchema };
