import { NextFunction, Request, Response } from 'express';

import { AuthService } from '@app/services';
import { HttpStatusCode } from '@app/types';

const authController = {
  // SIGNUP CUSTOMER
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await new AuthService().signup(req, res);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // LOGIN FOR USER
  loginUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await new AuthService().loginUser(req, res);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log('🚀 ~ file: auth.ts:27 ~ loginUser: ~ error:', error);
      next(error);
    }
  },

  // CUSTOMER LOGIN APP WITH PHONE NUMBER (OTP)
  sendOtpToCustomer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await new AuthService().sendOtpToCustomer(req, res);
      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log('🚀 ~ error:', error);
      next(error);
    }
  },

  // VERIFY OTP AND COMPLETE LOGIN WITH PHONE NUMBER
  verifyOtpAndGetCustomer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await new AuthService().verifyOtpAndGetCustomer(req, res);
      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log('🚀 ~ error:', error);
      next(error);
    }
  },

  // LOGIN WITH GOOGLE ACCOUNT
  loginWithGoogleAccount: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await new AuthService().loginWithGoogleAccount(req, res, next);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log('🚀 ~ error:', error);
      next(error);
    }
  },

  // LOGIN FOR CUSTOMER
  loginCustomer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await new AuthService().loginCustomer(req, res);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log('🚀 ~ file: auth.ts:41 ~ loginCustomer: ~ error:', error);
      next(error);
    }
  },

  // REQUEST REFRESH TOKEN FOR USER
  requestRefreshTokenForUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = await new AuthService().requestRefreshTokenForUser(req, res);
      res.status(HttpStatusCode.OK).json(accessToken);
    } catch (error) {
      console.log('🚀 ~ file: auth.ts:55 ~ requestRefreshTokenForUser: ~ error:', error);
      next(error);
    }
  },

  // REQUEST REFRESH TOKEN FOR CUSTOMER
  requestRefreshTokenForCustomer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = await new AuthService().requestRefreshTokenForCustomer(req, res);
      res.status(HttpStatusCode.OK).json(accessToken);
    } catch (error) {
      console.log('🚀 ~ file: auth.ts:69 ~ requestRefreshTokenForCustomer: ~ error:', error);
      next(error);
    }
  },

  // LOGOUT
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { message } = await new AuthService().logout(res);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
