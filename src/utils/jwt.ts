/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Role } from '@app/models/users/@type';
import { sign } from 'jsonwebtoken';
import { configApp } from '@app/configs';
const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = configApp();

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
      JWT_ACCESS_KEY,
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
      JWT_REFRESH_KEY,
      {
        expiresIn: '365d',
      },
    );
  }
}

export default JWT;
