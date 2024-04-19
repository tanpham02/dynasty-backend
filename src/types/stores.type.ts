import { LocationBaseModel } from '@app/types/common.types';
import { Document } from 'mongoose';

interface StoreConfig {
  feeShip?: number;
  transferContent?: string;
  reasonOrderCancel?: string[];
  hotlineSupport?: {
    order?: string;
    customerCareHotline?: string;
  };
}

interface FrequentlyAskedQuestions {
  question?: string;
  answer?: string;
}

interface TermAndPolicy {
  deliveryPolicy?: string;
  privatePolicy?: string;
  termAndCondition?: string;
}

interface StoreInformation extends LocationBaseModel {
  brandStore?: string; // Câu chuyện thương hiệu
  logo?: string; // logo cửa hàng
  name?: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  taxCode?: string;
}

interface Stores extends Document {
  storeConfig?: StoreConfig;
  storeInformation?: StoreInformation;
  faqs?: FrequentlyAskedQuestions;
  termAndPolicy?: TermAndPolicy;
}

export { Stores, StoreConfig, FrequentlyAskedQuestions, TermAndPolicy, StoreInformation };
