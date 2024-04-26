import { Schema, model } from 'mongoose';
import { Stores } from '../types/stores.type';

const storeSchema = new Schema<Stores>(
  {
    storeConfig: {
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
        order: {
          type: String,
        },
        customerCareHotline: {
          type: String,
        },
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

const StoreModel = model('stores', storeSchema);
export default StoreModel;
