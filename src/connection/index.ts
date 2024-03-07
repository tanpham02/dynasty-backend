/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import bcrypt from 'bcrypt';
import 'module-alias/register';
import mongoose, { ConnectOptions } from 'mongoose';

import { configApp } from '@app/configs';
import { SALT } from '@app/constants';
import UserModel from '@app/models/users';

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
      const salt = await bcrypt.genSalt(SALT);
      const passwordEncryption = await bcrypt.hash(seedData.password, salt);
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
