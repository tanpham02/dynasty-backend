import 'module-alias/register';
import mongoose from 'mongoose';

import { configApp } from '@app/configs';
import { connectOptions } from './type';

class ConnectDatabase {
  constructor() {
    this.connection();
  }

  async connection() {
    const { MONGO_URL } = configApp();
    try {
      const connectMongo = await mongoose.connect(MONGO_URL, connectOptions);
      console.log(`Connect to MongoDB success with ${connectMongo.connection.host}`);
    } catch (err) {
      console.log(`Connect to MongoDB fail with ${err}`);
      process.exit(1);
    }
  }
}
export default ConnectDatabase;
