import mongoose from 'mongoose';
import { staffSeedData } from './staff.seed';

import { configApp } from '@app/configs';

const runSeedData = async (cb: any) => {
  const { MONGO_URL } = cb();
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Seed data is creating...');
    await staffSeedData();
  } catch (error) {
    console.log('🚀 ~ Occur an error when create seed data:', error);
  } finally {
    console.log('Seed data is created.');
    await mongoose.connection.close();
  }
};

runSeedData(configApp);
