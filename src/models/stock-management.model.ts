import { Schema, model } from 'mongoose';

import { StockManagements, StockManagementTypes } from '@app/types';

const StockManagementSchema = new Schema<StockManagements>(
  {
    date: {
      type: Date,
    },
    type: {
      type: String,
      enum: StockManagementTypes,
    },
    stockManagementInfo: [
      {
        type: Schema.Types.ObjectId,
        refPath: 'stockManagementInfoRef',
      },
    ],
    stockManagementInfoRef: {
      type: String,
      required: true,
      enum: ['Ingredient', 'IngredientSnapshot'],
    },
    totalPrice: {
      type: Number,
    },
    note: {
      type: String,
    },
    isExported: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Pre-save hook to set `stockManagementInfoRef` based on `type`
StockManagementSchema.pre('validate', function (next) {
  if (this.type === StockManagementTypes.IMPORT) {
    this.stockManagementInfoRef = 'Ingredient';
  }
  if (this.type === StockManagementTypes.EXPORT) {
    this.stockManagementInfoRef = 'IngredientSnapshot';
  }
  next();
});

const StockManagementModel = model('StockManagement', StockManagementSchema);

export default StockManagementModel;
