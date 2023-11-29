import { Role } from '@app/models/user/@type';
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
        expiresIn: '1d',
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
        expiresIn: '7d',
      },
    );
  }
}

export default JWT;
