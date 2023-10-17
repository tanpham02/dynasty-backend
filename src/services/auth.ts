import { configApp } from '@app/configs';
import UserModel from '@app/models/user';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import jwt, { TokenI } from '@app/middlewares/jwt';
import { MODE, SALT } from '@app/constants';
import { verify } from 'jsonwebtoken';
import { genSalt, hash } from 'bcrypt';
import CustomerModel from '@app/models/customer';
import { Customer } from '@app/models/customer/@type';
import JWT from '@app/middlewares/jwt';
import User from '@app/models/user/@type';
import { wait } from 'iter-ops';
import CartModel from '@app/models/cart';


interface ErrorMessage {
  phoneNumber?: string;
  email?: string;
}

interface ResponseI {
  status: number;
  errors?: ErrorMessage;
  message?: string;
}

const { jwtRefreshKey } = configApp();

interface ResponseResultI {
  status: number;
  data: {
    message?: string;
    accessToken?: string;
  };
}

const jwtUser = new JWT<User>();
const jwtCustomer = new JWT<Customer>();

const authService = {
  // SIGNUP CUSTOMER
  signup: async (req: Request, res: Response) => {
    const { password, ...customerBody }: Customer = req.body;
    let errors: ErrorMessage = {};
    let response: ResponseI = {
      status: -1000,
    };
    try {
      const customerExists = await CustomerModel.findOne({
        $or: [
          {
            phoneNumber: customerBody.phoneNumber,
          },
          {
            email: customerBody.email,
          },
        ],
      });

      if (customerExists) {
        if (customerExists.phoneNumber === customerBody.phoneNumber) {
          errors.phoneNumber = 'Phone number already exists';
        }
        if (customerExists.email === customerBody.email) {
          errors.email = 'Email already exists';
        }
        response = {
          status: 409,
          errors,
        };
        return response;
      }
      if (password) {
        const salt = await genSalt(SALT);
        const passwordAfterHash = await hash(password, salt);
        const newCustomer = new CustomerModel({ ...customerBody, password: passwordAfterHash });
        await newCustomer.save();

        const newCart = new CartModel({ customerId: newCustomer._id });

        response = {
          status: 200,
          message: 'Đăng ký thành công',
        };
        await newCart.save();
      }

      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },

  // LOGIN FOR USER
  loginUser: async (req: Request, res: Response) => {
    const { username, password }: User = req.body;

    try {
      const user = await UserModel.findOne({ username: username });

      if (!user) {
        return {
          status: 404,
          message: 'Not found user',
        };
      }
      if (password && user?.password) {
        const validPassword = await compare(password, user?.password);

        if (!validPassword) {
          return { status: 401, message: 'Wrong password' };
        }

        if (user && validPassword) {
          const accessToken = jwtUser.generateAccessToken(user);
          const refreshToken = jwtUser.generateRefreshToken(user);
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
              refreshToken, // run on environment development
            },
          };
        }
      }
    } catch (error) {
      throw new Error('Occur error when login');
    }
  },

  // LOGIN FOR CUSTOMER
  loginCustomer: async (req: Request, res: Response) => {
    const { phoneNumber, password }: Customer = req.body;

    try {
      const customer = await CustomerModel.findOne({ phoneNumber: phoneNumber });

      if (!customer) {
        return {
          status: 404,
          message: 'Not found customer with this phone number',
        };
      }
      if (password && customer?.password) {
        const validPassword = await compare(password, customer?.password);

        if (!validPassword) {
          return { status: 401, message: 'Wrong password' };
        }

        if (customer && validPassword) {
          const accessToken = jwtCustomer.generateAccessToken(customer);
          const refreshToken = jwtCustomer.generateRefreshToken(customer);
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === MODE.PRODUCTION, // should turn on when run on environment production
            sameSite: true,
          });
          const { password, ...remainingCustomer } = customer.toObject();
          return {
            status: 200,
            data: {
              customer: remainingCustomer,
              accessToken,
              refreshToken, // run on environment development
            },
          };
        }
      }
    } catch (error) {
      throw new Error('Occur error when login');
    }
  },

  // REQUEST REFRESH TOKEN FOR USER
  requestRefreshTokenForUser: async (req: Request, res: Response) => {
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
        const newAccessToken = jwtUser.generateAccessToken(user as User);
        const newRefreshToken = jwtUser.generateRefreshToken(user as User);

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
      throw new Error(`${error}`);
    }
  },

  // REQUEST REFRESH TOKEN FOR CUSTOMER
  requestRefreshTokenForCustomer: async (req: Request, res: Response) => {
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

      verify(refreshTokenCookie, jwtRefreshKey || '', (err, customer) => {
        if (err) console.log(err);
        const newAccessToken = jwtCustomer.generateAccessToken(customer as Customer);
        const newRefreshToken = jwtCustomer.generateRefreshToken(customer as Customer);

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
      throw new Error(`${error}`);
    }
  },

  // LOGOUT
  logout: async (req: Request, res: Response) => {
    res.clearCookie('refreshToken');

    return { message: 'Logout success' };
  },
};

export default authService;
