/* eslint-disable prettier/prettier */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { compare } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { configApp } from '@app/configs';
import Exception from '@app/exception';
import {
  CartModel,
  CustomerAddressModel,
  CustomerModel,
  ProductFavoriteModel,
  StaffModel,
} from '@app/models';
import { CustomerService, GoogleService, SMSService, StaffService } from '@app/services';
import { CustomerType, Customers, HttpStatusCode, MODE, Staff } from '@app/types';
import { JWT, generateOtp, hashPassword } from '@app/utils';

const { STAFF_JWT_REFRESH_KEY, CUSTOMER_JWT_REFRESH_KEY } = configApp();

class AuthService {
  // SIGNUP CUSTOMER
  async signup(req: Request) {
    const customerSignupRequest: Customers = req.body;
    const existCustomer = await CustomerModel.findOne({
      $or: [
        {
          email: customerSignupRequest?.email,
        },
        {
          phoneNumber: customerSignupRequest?.phoneNumber,
        },
      ],
    });

    if (existCustomer) {
      if (existCustomer?.phoneNumber === customerSignupRequest?.phoneNumber) {
        throw new Exception(HttpStatusCode.CONFLICT, 'Phone number already exists');
      }
      if (existCustomer?.email === customerSignupRequest?.email) {
        throw new Exception(HttpStatusCode.CONFLICT, 'Email already exists');
      }
    }

    if (!customerSignupRequest?.password) {
      throw new Exception(HttpStatusCode.BAD_REQUEST, 'password field required');
    }

    const passwordAfterHash = await hashPassword(customerSignupRequest.password);

    const newCustomer = new CustomerModel({
      ...customerSignupRequest,
      password: passwordAfterHash,
    });

    const newCart = new CartModel({ customerId: newCustomer._id });
    const newCustomerAddress = new CustomerAddressModel({ customerId: newCustomer._id });
    const newProductFavorite = new ProductFavoriteModel({ customerId: newCustomer._id });
    await newProductFavorite.save();
    await newCustomerAddress.save();
    await newCart.save();
    newCustomer.set('customerAddressId', newCustomerAddress._id);
    const { password, ...remainingCustomer } = (await newCustomer.save()).toObject();
    return remainingCustomer;
  }

  // LOGIN FOR STAFF
  async loginStaff(req: Request, res: Response) {
    const { username, password }: Staff = req.body;
    const staff = await StaffModel.findOne({ username: username });

    if (!staff) {
      throw new Exception(HttpStatusCode.NOT_FOUND, 'username does not exist');
    }
    if (password && staff?.password) {
      const validPassword = await compare(password, staff?.password);

      if (!validPassword) {
        throw new Exception(HttpStatusCode.UN_AUTHORIZED, 'Wrong password');
      }

      if (staff && validPassword) {
        const userJwt = new JWT(staff._id, staff.role);
        const accessToken = userJwt.generateAccessToken();
        const refreshToken = userJwt.generateRefreshToken();
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === MODE.PRODUCTION, // should turn on when run on environment production
          sameSite: true,
        });
        const { password, ...remainingStaff } = staff.toObject();
        return {
          user: remainingStaff,
          accessToken,
          refreshToken, // run on environment development
        };
      }
    }
  }

  // SEND OTP
  async sendOtpToCustomer(req: Request, res: Response) {
    const request = req.body;
    const phoneNumber = String(request?.phoneNumber)?.startsWith('0')
      ? request?.phoneNumber
      : `0${request?.phoneNumber}`;
    const otp = generateOtp();

    if (!phoneNumber) throw new Exception(HttpStatusCode.BAD_REQUEST, 'Phone number is required');
    const customer = await CustomerModel.findOne({ phoneNumber });

    const smsService = new SMSService(phoneNumber, otp);

    const pwAfterHash = await hashPassword(phoneNumber);
    const smsResponse = await smsService.sendSms();

    if (!customer) {
      const newCustomer = new CustomerModel({
        phoneNumber: String(phoneNumber)?.startsWith('0') ? phoneNumber : `0${phoneNumber}`,
        password: pwAfterHash,
        otp: otp,
      });
      new CartModel({ customerId: newCustomer._id }).save();
      const newCustomerAddress = new CustomerAddressModel({ customerId: newCustomer._id });
      new ProductFavoriteModel({ customerId: newCustomer._id }).save();
      await newCustomerAddress.save();
      newCustomer.set('customerAddressId', newCustomerAddress._id);
      await newCustomer.save();
    } else {
      await customer.updateOne({ $set: { otp } }, { new: true });
    }

    return smsResponse;
  }

  // VERIFY OTP AND COMPLETE LOGIN WITH PHONE NUMBER
  async verifyOtpAndGetCustomer(req: Request, res: Response) {
    const { phoneNumber, otp } = req.body;

    if (phoneNumber && otp) {
      const smsService = new SMSService(phoneNumber, otp);
      const customer = await smsService.verifyOtpAndGetCustomer();

      const { password, ...customerRemaining }: any = customer;

      const jwt = new JWT(customer?._id);

      const accessToken = jwt.generateAccessToken();
      const refreshToken = jwt.generateRefreshToken();

      return { customerInfo: customerRemaining, accessToken, refreshToken };
    }
  }

  // LOGIN FOR CUSTOMER
  async loginCustomer(req: Request, res: Response) {
    const { phoneNumber, password }: Customers = req.body;

    const customer = await CustomerModel.findOne({ phoneNumber: phoneNumber });

    if (!customer) {
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Not found customer with this phone number');
    }
    if (password && customer?.password) {
      const validPassword = await compare(password, customer?.password);

      if (!validPassword) {
        throw new Exception(HttpStatusCode.UN_AUTHORIZED, 'Wrong password');
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
    const { accessToken: accessTokenBody } = req.body;

    const customerService = new CustomerService(CustomerModel, 'customer');

    const userInfo = await new GoogleService().getCustomerInfo(accessTokenBody, next);

    if (userInfo) {
      const customerByEmail = await customerService.getByEmail(userInfo.email);
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
        const newCustomerAddress = new CustomerAddressModel({ customerId: response._id });
        await new CartModel({ customerId: response._id }).save();
        await new ProductFavoriteModel({ customerId: response._id }).save();
        await newCustomerAddress.save();

        newCustomer.$set('customerAddressId', newCustomerAddress._id);

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

  // REQUEST REFRESH TOKEN FOR STAFF
  async requestRefreshTokenForStaff(req: Request, res: Response) {
    let newAccessToken;
    let newRefreshToken;
    const refreshToken = req.body?.refreshToken;

    if (!refreshToken) {
      throw new Exception(HttpStatusCode.UN_AUTHORIZED, "You're not authenticated");
    }

    verify(refreshToken, STAFF_JWT_REFRESH_KEY || '', (err: any, _staff: any) => {
      if (err) {
        throw new Exception(req?.statusCode || HttpStatusCode.UN_AUTHORIZED, err?.message);
      }
      const staffJwt = new JWT(_staff._id, _staff.role);
      newAccessToken = staffJwt.generateAccessToken();
      newRefreshToken = staffJwt.generateRefreshToken();

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === MODE.PRODUCTION,
        sameSite: true,
      });
      res.setHeader('Authorization', 'Bearer ' + newAccessToken);
    });
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  // REQUEST REFRESH TOKEN FOR CUSTOMER
  async requestRefreshTokenForCustomer(req: Request, res: Response) {
    let newAccessToken;
    let newRefreshToken;
    const refreshToken = req.body?.refreshToken;

    if (!refreshToken) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, "You're not authenticated");
      throw exception;
    }

    verify(refreshToken, CUSTOMER_JWT_REFRESH_KEY || '', (err: any, _customer: any) => {
      if (err) {
        const exception = new Exception(
          req?.statusCode || HttpStatusCode.BAD_REQUEST,
          err?.message,
        );
        throw exception;
      }
      const customerJwt = new JWT(_customer._id);
      newAccessToken = customerJwt.generateAccessToken();
      newRefreshToken = customerJwt.generateRefreshToken();

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true, // The cookie only accessible by the web server
        secure: process.env.NODE_ENV === MODE.PRODUCTION, //https
        sameSite: true,
      });
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  // LOGOUT
  async logout(res: Response) {
    res.clearCookie('refreshToken');

    return { message: 'Logout success' };
  }
}

export default AuthService;
