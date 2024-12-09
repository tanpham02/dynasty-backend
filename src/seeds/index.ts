import mongoose from 'mongoose';

import { staffSeeder, productsSeeder } from './handler';
import { configApp } from '@app/configs';
import { Callback } from '@app/types';

const runSeedData = async (configFc: Callback) => {
  const { MONGO_URL } = configFc();
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Seed data is creating...');
    await staffSeeder();
    await productsSeeder();
  } catch (error) {
    console.log('🚀 ~ Occur an error when create seed data:', error);
  } finally {
    console.log('Seed data is created');
    await mongoose.connection.close();
  }
};

runSeedData(configApp);
