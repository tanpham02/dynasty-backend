/* eslint-disable prettier/prettier */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { compare } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { configApp } from '@app/configs';
import { FIELDS_NAME } from '@app/constants';
import Exception from '@app/exception';
import { CartModel, CustomerAddressModel, CustomerModel, StaffModel } from '@app/models';
import { GoogleService, SMSService, StaffService } from '@app/services';
import { CustomerType, Customers, HttpStatusCode, MODE, Staff } from '@app/types';
import { JWT, generateOtp, hashPassword } from '@app/utils';

const { JWT_REFRESH_KEY } = configApp();

class AuthService {
  // SIGNUP CUSTOMER
  async signup(req: Request, __res: Response) {
    const customerSignupRequest: Customers = JSON.parse(req.body?.[FIELDS_NAME.CUSTOMER_SIGNUP]);
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

    const passwordAfterHash = await hashPassword(customerSignupRequest.password);
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
  }

  // LOGIN FOR USER
  async loginUser(req: Request, res: Response) {
    const { username, password }: Staff = JSON.parse(req.body?.[FIELDS_NAME.USER_LOGIN]);
    const user = await StaffModel.findOne({ username: username });

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
  }

  async sendOtpToCustomer(req: Request, res: Response) {
    const request = req.body;
    const phoneNumber = request?.phoneNumber;
    const otp = generateOtp();

    if (phoneNumber) {
      const smsService = new SMSService(phoneNumber, otp);

      const pwAfterHash = await hashPassword(phoneNumber);

      const newCustomer = new CustomerModel({
        phoneNumber: phoneNumber,
        password: pwAfterHash,
        otp: otp,
      });

      await newCustomer.save();
      await smsService.sendSms();
    }
  }

  // VERIFY OTP AND COMPLETE LOGIN WITH PHONE NUMBER
  async verifyOtpAndGetCustomer(req: Request, res: Response) {
    const { phoneNumber, otp } = req.body;

    if (phoneNumber && otp) {
      const smsService = new SMSService(phoneNumber, otp);
      const customer = await smsService.verifyOtpAndGetCustomer();

      if (!customer) {
        const exception = new Exception(HttpStatusCode.BAD_REQUEST, 'OTP is wrong or invalid!');
        throw exception;
      }

      const { password, ...customerRemaining }: any = customer?.toObject();

      const jwt = new JWT(customer?._id);

      const accessToken = jwt.generateAccessToken();
      const refreshToken = jwt.generateRefreshToken();

      await CustomerModel.updateOne({ _id: customer._id }, { $set: { otp: null } });

      return { customerInfo: customerRemaining, accessToken, refreshToken };
    }
  }

  // LOGIN FOR CUSTOMER
  async loginCustomer(req: Request, res: Response) {
    const { phoneNumber, password }: Customers = JSON.parse(req.body?.[FIELDS_NAME.CUSTOMER_LOGIN]);

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
  }

  // LOGIN WITH GOOGLE ACCOUNT
  async loginWithGoogleAccount(req: Request, res: Response, next: NextFunction) {
    const { accessToken } = req.body;

    const staffService = new StaffService(StaffModel, 'staff');

    const userInfo = await new GoogleService().getCustomerInfo(accessToken, next);

    if (userInfo) {
      const customerByEmail = await staffService.getByEmail(userInfo.email);
      if (!customerByEmail) {
        const pwAfterHash = await hashPassword(userInfo.email);
        const newCustomer = new CustomerModel({
          fullName: userInfo.name,
          email: userInfo.email,
          customerType: CustomerType.NEW,
          avatar: userInfo.picture,
          password: pwAfterHash,
        });

        const response = await newCustomer.save();
        await new CustomerAddressModel({ customerId: response._id }).save();
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
  }

  // REQUEST REFRESH TOKEN FOR USER
  async requestRefreshTokenForUser(req: Request, res: Response) {
    const refreshTokenCookie = req.cookies?.refreshToken || '';

    if (!refreshTokenCookie) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, "You're not authenticated");
      throw exception;
    }

    const newAccessTk = verify(
      refreshTokenCookie,
      JWT_REFRESH_KEY || '',
      (err: any, _user: any) => {
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
      },
    );
    return {
      accessToken: newAccessTk,
    };
  }

  // REQUEST REFRESH TOKEN FOR CUSTOMER
  async requestRefreshTokenForCustomer(req: Request, res: Response) {
    const refreshTokenCookie = req.cookies?.refreshToken || '';

    if (!refreshTokenCookie) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, "You're not authenticated");
      throw exception;
    }

    const newAccessTk = verify(
      refreshTokenCookie,
      JWT_REFRESH_KEY || '',
      (err: any, _customer: any) => {
        if (err) {
          const exception = new Exception(req?.statusCode || 0, err?.message);
          throw exception;
        }
        const customerJwt = new JWT(_customer._id);
        const newAccessToken = customerJwt.generateAccessToken();
        const newRefreshToken = customerJwt.generateRefreshToken();

        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true, // The cookie only accessible by the web server
          secure: process.env.NODE_ENV === MODE.PRODUCTION, //https
          sameSite: true,
        });

        return newAccessToken;
      },
    );

    return { accessToken: newAccessTk };
  }

  // LOGOUT
  async logout(res: Response) {
    res.clearCookie('refreshToken');

    return { message: 'Logout success' };
  }
}

export default AuthService;
