/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Role } from '@app/models/users/@type';
import { sign } from 'jsonwebtoken';
import { configApp } from '@app/configs';
const { jwtAccessKey, jwtRefreshKey } = configApp();

class JWT {
  private _id: string;
  private role?: Role;

  constructor(_id: string, role?: Role) {
    this._id = _id;
    if (role) {
      this.role = role;
    }
  }

  // GENERATE ACCESS TOKEN
  generateAccessToken() {
    return sign(
      {
        id: this._id,
        role: this.role,
      },
      jwtAccessKey ?? '',
      {
        expiresIn: '7d',
      },
    );
  }

  // GENERATE REFRESH TOKEN
  generateRefreshToken() {
    return sign(
      {
        id: this._id,
        role: this.role,
      },
      jwtRefreshKey ?? '',
      {
        expiresIn: '365d',
      },
    );
  }
}

export default JWT;
