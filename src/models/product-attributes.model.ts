import { Schema, model } from 'mongoose';

import { ProductAttribute } from '@app/types';

export const ProductAttributeSchema = new Schema<ProductAttribute>(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    attributeList: [
      {
        label: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const ProductAttributeModel = model('ProductAttribute', ProductAttributeSchema);

export default ProductAttributeModel;
