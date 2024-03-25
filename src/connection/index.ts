/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'module-alias/register';
import mongoose, { ConnectOptions } from 'mongoose';

import { configApp } from '@app/configs';
import { UserModel } from '@app/models/exportModel';
import hashPassword from '@app/utils/hashPassword';

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
    const checkEmpty = await UserModel.find();
    if (Array.isArray(checkEmpty) && !checkEmpty.length) {
      const passwordEncryption = await hashPassword(seedData.password);
      const newUser = new UserModel({ ...seedData, password: passwordEncryption });
      await newUser.save();
      console.log('created seed data');
    }
  } catch (err) {
    console.log(`Connect to MongoDB fail with ${err}`);
    process.exit(1);
  }
};

export default connection;
