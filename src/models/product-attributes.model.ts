import { Schema, model } from 'mongoose';
import { ProductAttribute } from '../types/product-attributes.type';

export const ProductAttributeSchema = new Schema<ProductAttribute>(
  {
    name: {
      type: String,
      required: true,
    },
    attributeList: [
      {
        name: {
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
