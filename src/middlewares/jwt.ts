import User from '@app/models/user/@type';
import { sign } from 'jsonwebtoken';
import { configApp } from '@app/configs';
const { jwtAccessKey, jwtRefreshKey } = configApp();

const jwt = {
  // GENERATE ACCESS TOKEN
  generateAccessToken: (user: User) => {
    return sign(
      {
        id: user._id,
        role: user.role,
      },
      jwtAccessKey ?? '',
      {
        expiresIn: '20s',
      },
    );
  },

  // GENERATE REFRESH TOKEN
  generateRefreshToken: (user: User) => {
    return sign(
      {
        id: user._id,
        role: user.role,
      },
      jwtRefreshKey ?? '',
      {
        expiresIn: '7d',
      },
    );
  },
};

export default jwt;
