import { StaffModel } from '@app/models';

const seedData = [
  {
    username: 'admin',
    phoneNumber: '0372800762',
    email: 'phamvantan1311@gmail.com',
    password: '13112002',
    role: 'ADMIN',
  },
];

export const staffSeedData = async () => {
  await StaffModel.insertMany(seedData);
};
