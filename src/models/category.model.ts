import { Schema, model } from 'mongoose';

import { Category, ChildCategory, Status } from '@app/types';

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
