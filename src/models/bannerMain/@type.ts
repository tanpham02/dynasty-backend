import { Document } from 'mongoose';

interface BannerMain extends Document {
  banners?: string[];
  redirect?: string;
}


export default BannerMain
