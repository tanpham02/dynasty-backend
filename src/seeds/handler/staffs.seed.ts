import { StaffModel } from '@app/models';
import { hashPassword } from '@app/utils';

const seedData = [
  {
    username: 'admin',
    phoneNumber: '0372800762',
    email: 'phamvantan1311@gmail.com',
    password: '13112002',
    role: 'ADMIN',
  },
];

export const staffSeeder = async () => {
  const newSeedData = await Promise.all(
    seedData.map(async (item) => {
      if (Object.keys(item).some((item) => item === 'password')) {
        item.password = await hashPassword(item.password);
      }
      return item;
    }),
  );

  await StaffModel.insertMany(newSeedData);
};
