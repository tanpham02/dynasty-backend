import { model, Schema } from 'mongoose';

import { Salary } from '@app/types';

const SalarySchema = new Schema<Salary>(
  {
    staffId: {
      type: Schema.Types.ObjectId,
      ref: 'Staff',
    },
    value: {
      type: Number,
      default: 0,
    },
    isPayment: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const SalaryModel = model('Salary', SalarySchema);

export default SalaryModel;
