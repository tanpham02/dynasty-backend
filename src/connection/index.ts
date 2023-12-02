import mongoose, { ConnectOptions } from 'mongoose';
import 'module-alias/register';
import { configApp } from '@app/configs';

interface ConnectOptionsCustom extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const connectOptions: ConnectOptionsCustom = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = async () => {
  const { MONGO_URL } = configApp();
  try {
    const connectMongo = await mongoose.connect(MONGO_URL, connectOptions);
    console.log(`Connect to MongoDB success with ${connectMongo.connection.host}`);
  } catch (err) {
    console.log(`Connect to MongoDB fail with ${err}`);
    process.exit(1);
  }
};

export default connection;
