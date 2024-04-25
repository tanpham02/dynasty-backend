import { Schema, model } from 'mongoose';

import { Status } from '@app/types';
import { Category, ChildCategory } from '../types/category.type';

const CategorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: Status,
      default: Status.ACTIVE,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    priority: {
      type: Number,
    },
    avatar: {
      type: String,
    },
    visible: {
      type: Boolean,
    },
    isShowHomePage: {
      type: Boolean,
      default: true,
    },
    slug: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const ChildCategorySchema = new Schema<ChildCategory>({
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  category: {
    type: [CategorySchema],
  },
});

CategorySchema.add({ childrenCategory: { type: ChildCategorySchema } });

const CategoryModel = model('Category', CategorySchema);

export default CategoryModel;
