/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { configApp } from '@app/configs';
import { FIELDS_NAME, MODE, SALT } from '@app/constants';
import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';
import JWT from '@app/middlewares/jwt';
import CartModel from '@app/models/carts';
import CustomerAddressModel from '@app/models/customerAddress';
import CustomerModel from '@app/models/customers';
import { Customer, CustomerType } from '@app/models/customers/@type';
import UserModel from '@app/models/users';
import User from '@app/models/users/@type';
import { compare, genSalt, hash, hashSync } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import FirebaseAdmin from 'firebase-admin';
import { OAuth2Client } from 'google-auth-library';
import googleService from './googleService';
import CustomerService from './customers';

const { jwtRefreshKey } = configApp();

const authService = {
  // SIGNUP CUSTOMER
  signup: async (req: Request, __res: Response) => {
    const customerSignupRequest: Customer = JSON.parse(req.body?.[FIELDS_NAME.CUSTOMER_SIGNUP]);
    const existCustomer = await CustomerModel.findOne({
      $or: [
        {
          phoneNumber: customerSignupRequest?.phoneNumber,
        },
        {
          email: customerSignupRequest?.email,
        },
      ],
    });

    if (existCustomer) {
      if (existCustomer?.phoneNumber === customerSignupRequest?.phoneNumber) {
        const exception = new Exception(HttpStatusCode.CONFLICT, 'Phone number already exist');
        throw exception;
      }
      if (existCustomer?.email === customerSignupRequest?.email) {
        const exception = new Exception(HttpStatusCode.CONFLICT, 'Email already exists');
        throw exception;
      }
    }

    if (!customerSignupRequest?.password) {
      const exception = new Exception(HttpStatusCode.BAD_REQUEST, 'password field is requirement');
      throw exception;
    }

    const salt = await genSalt(SALT);
    const passwordAfterHash = await hash(customerSignupRequest.password, salt);
    const newCustomer = new CustomerModel({
      ...customerSignupRequest,
      password: passwordAfterHash,
    });

    await newCustomer.save();

    const newCart = new CartModel({ customerId: newCustomer._id });
    const newCustomerAddress = new CustomerAddressModel({ customerId: newCustomer._id });
    await newCustomerAddress.save();
    await newCart.save();
    return { message: 'Đăng ký thành công' };
  },

  // LOGIN FOR USER
  loginUser: async (req: Request, res: Response) => {
    const { username, password }: User = JSON.parse(req.body?.[FIELDS_NAME.USER_LOGIN]);
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'username does not exist');
      throw exception;
    }
    if (password && user?.password) {
      const validPassword = await compare(password, user?.password);

      if (!validPassword) {
        const exception = new Exception(HttpStatusCode.UN_AUTHORIZED, 'Wrong password');
        throw exception;
      }

      if (user && validPassword) {
        const userJwt = new JWT(user._id, user.role);
        const accessToken = userJwt.generateAccessToken();
        const refreshToken = userJwt.generateRefreshToken();
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === MODE.PRODUCTION, // should turn on when run on environment production
          sameSite: true,
        });
        const { password, ...remainingUser } = user.toObject();
        return {
          user: remainingUser,
          accessToken,
          refreshToken, // run on environment development
        };
      }
    }
  },

  // CUSTOMER LOGIN APP WITH PHONE NUMBER (OTP)
  customerLoginWithPhoneNumber: async (req: Request, res: Response) => {
    const { phoneNumber } = JSON.parse(req.body[FIELDS_NAME.CUSTOMER]);
    console.log('🚀 ~ customerLoginWithPhoneNumber: ~ phoneNumber:', phoneNumber);

    // const userExisted = await FirebaseAdmin.auth().getUserByPhoneNumber(phoneNumber);
    // if (userExisted) {
    const response = await FirebaseAdmin.auth().createUser({
      phoneNumber: phoneNumber,
    });

    // const appVerifier =

    // const auth = getAuth();
    // const appVerifier = window.recaptchaVerifier;
    // await signInWithPhoneNumber(auth, phoneNumber);

    // console.log('🚀 ~ response:', response);
    // return response;
  },

  // LOGIN FOR CUSTOMER
  loginCustomer: async (req: Request, res: Response) => {
    const { phoneNumber, password }: Customer = JSON.parse(req.body?.[FIELDS_NAME.CUSTOMER_LOGIN]);

    const customer = await CustomerModel.findOne({ phoneNumber: phoneNumber });

    if (!customer) {
      const exception = new Exception(
        HttpStatusCode.NOT_FOUND,
        'Not found customer with this phone number',
      );
      throw exception;
    }
    if (password && customer?.password) {
      const validPassword = await compare(password, customer?.password);

      if (!validPassword) {
        const exception = new Exception(HttpStatusCode.UN_AUTHORIZED, 'Wrong password');
        throw exception;
      }

      if (customer && validPassword) {
        const customerJwt = new JWT(customer._id);
        const accessToken = customerJwt.generateAccessToken();
        const refreshToken = customerJwt.generateRefreshToken();
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === MODE.PRODUCTION, // should turn on when run on environment production
          sameSite: true,
        });
        const { password, ...remainingCustomer } = customer.toObject();
        return {
          customer: remainingCustomer,
          accessToken,
          refreshToken, // run on environment development
        };
      }
    }
  },

  // LOGIN WITH GOOGLE ACCOUNT
  loginWithGoogleAccount: async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.body;

    const customerService = new CustomerService(CustomerModel, 'customer');

    const userInfo = await googleService.getCustomerInfo(accessToken, next);

    if (userInfo) {
      const customerByEmail = await customerService.getByEmail(userInfo.email);
      if (!customerByEmail) {
        const salt = await genSalt(SALT);
        const pwAfterHash = await hash(userInfo.email, salt);
        const newCustomer = new CustomerModel({
          fullName: userInfo.name,
          email: userInfo.email,
          customerType: CustomerType.NEW,
          avatar: userInfo.picture,
          password: pwAfterHash,
        });

        const response = await newCustomer.save();
        const customerJwt = new JWT(response._id);
        const accessToken = customerJwt.generateAccessToken();
        const refreshToken = customerJwt.generateRefreshToken();

        const { password, ...infoRemaining } = response.toObject();
        return {
          customerInfo: infoRemaining,
          accessToken,
          refreshToken,
        };
      }

      const customerJwt = new JWT(customerByEmail._id);
      const accessToken = customerJwt.generateAccessToken();
      const refreshToken = customerJwt.generateRefreshToken();

      return {
        customerInfo: customerByEmail,
        accessToken,
        refreshToken,
      };
    }
  },

  // REQUEST REFRESH TOKEN FOR USER
  requestRefreshTokenForUser: async (req: Request, res: Response) => {
    const refreshTokenCookie = req.cookies?.refreshToken || '';

    if (!refreshTokenCookie) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, "You're not authenticated");
      throw exception;
    }

    const newAccessTk = verify(refreshTokenCookie, jwtRefreshKey || '', (err: any, _user: any) => {
      if (err) {
        const exception = new Exception(req?.statusCode || 0, err?.message);
        throw exception;
      }
      const userJwt = new JWT(_user._id, _user.role);
      const newAccessToken = userJwt.generateAccessToken();
      const newRefreshToken = userJwt.generateRefreshToken();

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === MODE.PRODUCTION,
        sameSite: true,
      });

      return newAccessToken;
    });
    return {
      accessToken: newAccessTk,
    };
  },

  // REQUEST REFRESH TOKEN FOR CUSTOMER
  requestRefreshTokenForCustomer: async (req: Request, res: Response) => {
    const refreshTokenCookie = req.cookies?.refreshToken || '';

    if (!refreshTokenCookie) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, "You're not authenticated");
      throw exception;
    }

    const newAccessTk = verify(
      refreshTokenCookie,
      jwtRefreshKey || '',
      (err: any, _customer: any) => {
        if (err) {
          const exception = new Exception(req?.statusCode || 0, err?.message);
          throw exception;
        }
        const customerJwt = new JWT(_customer._id);
        const newAccessToken = customerJwt.generateAccessToken();
        const newRefreshToken = customerJwt.generateRefreshToken();

        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === MODE.PRODUCTION,
          sameSite: true,
        });

        return newAccessToken;
      },
    );

    return { accessToken: newAccessTk };
  },

  // LOGOUT
  logout: async (res: Response) => {
    res.clearCookie('refreshToken');

    return { message: 'Logout success' };
  },
};

export default authService;
