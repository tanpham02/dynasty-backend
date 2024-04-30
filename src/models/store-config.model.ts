import { Schema, model } from 'mongoose';
import { StoreConfig } from '../types/store-config.type';

const storeConfigSchema = new Schema<StoreConfig>(
  {
    storeSetting: {
      feeShip: {
        type: Number,
      },
      transferContent: {
        type: String,
      },
      reasonOrderCancel: {
        type: [String],
      },
      hotlineSupport: {
        type: String,
      },
    },
    storeInformation: {
      brandStore: {
        type: String,
      },
      brandLogo: {
        type: String,
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      address: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      taxCode: {
        type: String,
      },
      location: {
        type: String,
      },
      cityId: {
        type: String,
      },
      city: {
        type: String,
      },
      districtId: {
        type: String,
      },
      district: {
        type: String,
      },
      wardId: {
        type: String,
      },
      ward: {
        type: String,
      },
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
    },
    faqs: {
      question: {
        type: String,
      },
      answer: {
        type: String,
      },
    },
    termAndPolicy: {
      deliveryPolicy: {
        type: String,
      },
      privatePolicy: {
        type: String,
      },
      termAndCondition: {
        type: String,
      },
    },
    emailConfig: {
      username: {
        type: String,
      },
      password: {
        type: String,
      },
      mailServer: {
        type: String,
      },
      port: {
        type: Number,
      },
    },
    bankAccountConfig: {
      bankCode: {
        type: String,
      },
      bankNumber: {
        type: String,
      },
      bankName: {
        type: String,
      },
      bankBranch: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const StoreConfigModel = model('StoreConfig', storeConfigSchema);
export default StoreConfigModel;
