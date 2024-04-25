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

interface BankAccountConfig {
  bankCode?: string;
  bankNumber?: string;
  bankName?: string;
  bankBranch?: string;
}

interface EmailConfig {
  username: string;
  password: string;
  mailServer: string; // SMTP
  port: number; // 587
  isDefault: boolean; // false
}

interface Stores extends Document {
  storeConfig?: StoreConfig;
  storeInformation?: StoreInformation;
  faqs?: FrequentlyAskedQuestions;
  termAndPolicy?: TermAndPolicy;
  emailConfig?: EmailConfig;
  bankAccountConfig?: BankAccountConfig;
}

export { Stores, StoreConfig, FrequentlyAskedQuestions, TermAndPolicy, StoreInformation };
