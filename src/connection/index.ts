/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import mongoose, { ConnectOptions } from 'mongoose';
import 'module-alias/register';
import { configApp } from '@app/configs';
import UserModel from '@app/models/users';
import bcrypt from 'bcrypt';
import { SALT } from '@app/constants';

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
  email: 'admin@gmail.com',
  password: '123456',
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
