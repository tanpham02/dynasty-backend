import { Document } from 'mongoose';

interface BannerMain extends Document {
  name?: string;
  banner?: string;
  redirect?: string;
}

export default BannerMain;
