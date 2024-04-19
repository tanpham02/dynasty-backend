import { Schema, model } from 'mongoose';
import { ProductFavorite } from '../types/product-favorite.type';

const productFavoriteSchema = new Schema<ProductFavorite>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

const ProductFavoriteModel = model('ProductFavorite', productFavoriteSchema);

export default ProductFavoriteModel;
