import { Schema, model } from 'mongoose';

import { Banner } from '@app/types';

const BannerSchema = new Schema<Banner>(
  {
    name: {
      type: String,
    },
    priority: {
      type: Number,
    },
    url: {
      type: String,
    },
    redirect: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

const BannerMainModel = model('Banner', BannerSchema);

export default BannerMainModel;
