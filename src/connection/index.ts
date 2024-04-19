/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'module-alias/register';
import mongoose, { ConnectOptions } from 'mongoose';

import { configApp } from '@app/configs';
import { StaffModel } from '@app/models';
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

const connection = async () => {
  const { MONGO_URL } = configApp();
  try {
    const connectMongo = await mongoose.connect(MONGO_URL, connectOptions);
    console.log(`Connect to MongoDB success with ${connectMongo.connection.host}`);
    const checkEmpty = await StaffModel.find();
    if (Array.isArray(checkEmpty) && !checkEmpty.length) {
      const passwordEncryption = await hashPassword(seedData.password);
      seedData.password = passwordEncryption;
      const newUser = new StaffModel(seedData);
      await newUser.save();
      console.log('Initialize seed data success');
    }
  } catch (err) {
    console.log(`Connect to MongoDB fail with ${err}`);
    process.exit(1);
  }
};

export default connection;
