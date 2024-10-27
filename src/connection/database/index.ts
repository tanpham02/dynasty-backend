/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'module-alias/register';
import mongoose, { ConnectOptions } from 'mongoose';

import { configApp } from '@app/configs';
import { StaffModel, StoreConfigModel } from '@app/models';
import { hashPassword } from '@app/utils';

interface ConnectOptionsCustom extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const connectOptions: ConnectOptionsCustom = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const seedData = {
  username: 'admin',
  phoneNumber: '0372800762',
  email: 'phamvantan1311@gmail.com',
  password: '13112002',
  role: 'ADMIN',
};

const connectDatabase = async () => {
  const { MONGO_URL } = configApp();
  try {
    const connectMongo = await mongoose.connect(MONGO_URL, connectOptions);
    console.log(`Connect to MongoDB success with ${connectMongo.connection.host}`);
    const isExistStaff = await StaffModel.find();
    const isExistStoreConfig = await StoreConfigModel.find();
    if (Array.isArray(isExistStaff) && !isExistStaff.length) {
      const passwordEncryption = await hashPassword(seedData.password);
      seedData.password = passwordEncryption;
      const newUser = new StaffModel(seedData);
      await newUser.save();
      console.log('Initialize seed staff data success');
    }
    if (Array.isArray(isExistStoreConfig) && !isExistStoreConfig.length) {
      const newStoreConfig = new StoreConfigModel();
      await newStoreConfig.save();
      console.log('Initialize seed store config data success');
    }
  } catch (err) {
    console.log(`Connect to MongoDB fail with ${err}`);
    process.exit(1);
  }
};

export default connectDatabase;
