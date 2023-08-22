import { Schema, Model, model } from 'mongoose';
import { ProductVariantBaseType, ProductVariantSizeType, ProductVariants } from './@type';
import { Status } from '@app/constants';

const ProductVariantsSchema = new Schema<ProductVariants>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'ProductModel',
    },
    status: {
      type: String,
      enum: Status,
      default: Status.ACTIVE,
    },
    baseVariant: [
      {
        base: {
          type: String,
          enum: ProductVariantBaseType,
          default: ProductVariantBaseType.PAN,
        },
        priceVariant: {
          type: Number,
        },
      },
    ],
    sizeVariant: [
      {
        size: {
          type: String,
          enum: ProductVariantSizeType,
          default: ProductVariantSizeType.SMALL,
        },
        priceVariant: {
          type: Number,
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const ProductVariantsModel = model('ProductVariant', ProductVariantsSchema);

export default ProductVariantsModel;
