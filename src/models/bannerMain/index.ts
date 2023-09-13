import BannerMain from './@type';
import { Schema, model } from 'mongoose';

const BannerMainSchema = new Schema<BannerMain>(
  {
    banners: [String],
    redirect: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

const BannerMainModel = model('BannerMain', BannerMainSchema);

export default BannerMainModel;
