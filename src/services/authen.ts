import { configApp } from '@app/configs';
import UserModel from '@app/models/user';
import User from '@app/models/user/@type';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import jwt from '@app/middlewares/jwt';
import { MODE } from '@app/constants';
import { verify } from 'jsonwebtoken';

const { jwtRefreshKey } = configApp();

interface ResponseResultI {
  status: number;
  data: {
    message?: string;
    accessToken?: string;
  };
}

const authenService = {
  // LOGIN
  login: async (req: Request, res: Response) => {
    const { phoneNumber, password }: User = req.body;

    try {
      const user = await UserModel.findOne({ phoneNumber: phoneNumber });

      if (!user) {
        return {
          status: 404,
          message: 'Not found user with this phone number',
        };
      }
      if (password && user?.password) {
        const validPassword = await compare(password, user?.password);

        if (!validPassword) {
          return { status: 401, message: 'Wrong password' };
        }

        if (user && validPassword) {
          const accessToken = jwt.generateAccessToken(user);
          const refreshToken = jwt.generateRefreshToken(user);
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === MODE.PRODUCTION, // should turn on when run on environment production
            sameSite: true,
          });
          const { password, ...remainingUser } = user.toObject();
          return {
            status: 200,
            data: {
              user: remainingUser,
              accessToken,
            },
          };
        }
      }
    } catch (error) {
      throw new Error('Occur error when login');
    }
  },

  // REQUEST REFRESH TOKEN
  requestRefreshToken: async (req: Request, res: Response) => {
    try {
      const refreshTokenCookie = req?.headers?.cookie?.split('=')?.[1] ?? '';

      let responseResult: ResponseResultI = {
        status: -100,
        data: {
          message: '',
          accessToken: '',
        },
      };

      if (!refreshTokenCookie) {
        responseResult = {
          status: 401,
          data: {
            message: "You're not authenticated",
          },
        };
      }

      verify(refreshTokenCookie, jwtRefreshKey || '', (err, user) => {
        if (err) console.log(err);
        const newAccessToken = jwt.generateAccessToken(user as User);
        const newRefreshToken = jwt.generateRefreshToken(user as User);

        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === MODE.PRODUCTION,
          sameSite: true,
        });

        responseResult = {
          status: 200,
          data: {
            accessToken: newAccessToken,
          },
        };
      });

      return responseResult;
    } catch (error) {
      console.log('🚀 requestRefreshToken: ~ error:', error);
      throw new Error(`${error}`);
    }
  },

  // LOGOUT
  logout: async (req: Request, res: Response) => {
    res.clearCookie('refreshToken');

    return { message: 'Logout success' };
  },
};

export default authenService;
