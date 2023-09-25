import { Role } from '@app/models/user/@type';
import { sign } from 'jsonwebtoken';
import { configApp } from '@app/configs';
const { jwtAccessKey, jwtRefreshKey } = configApp();

export interface TokenI {
  _id?: string;
  role?: Role;
}

class JWT<T> {
  // GENERATE ACCESS TOKEN
  generateAccessToken(objectRes: T & TokenI) {
    return sign(
      {
        id: objectRes._id,
        role: objectRes.role,
      },
      jwtAccessKey ?? '',
      {
        expiresIn: '1d',
      },
    );
  }

  // GENERATE REFRESH TOKEN
  generateRefreshToken(objectRes: T & TokenI) {
    return sign(
      {
        id: objectRes._id,
        role: objectRes.role,
      },
      jwtRefreshKey ?? '',
      {
        expiresIn: '7d',
      },
    );
  }
}

export default JWT;
