import { ConnectOptions } from 'mongoose';

interface ConnectOptionsCustom extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

export const connectOptions: ConnectOptionsCustom = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
