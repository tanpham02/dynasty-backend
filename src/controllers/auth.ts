import { NextFunction, Request, Response } from 'express';
import authService from '@app/services/auth';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import { Exception } from '@app/exception';

const authController = {
  // SIGNUP CUSTOMER
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { message } = await authService.signup(req, res);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },

  // LOGIN FOR USER
  loginUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await authService.loginUser(req, res);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log('🚀 ~ file: auth.ts:27 ~ loginUser: ~ error:', error);
      next(error);
    }
  },

  // LOGIN FOR CUSTOMER
  loginCustomer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await authService.loginCustomer(req, res);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log('🚀 ~ file: auth.ts:41 ~ loginCustomer: ~ error:', error);
      next(error);
    }
  },

  // REQUEST REFRESH TOKEN FOR USER
  requestRefreshTokenForUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = await authService.requestRefreshTokenForUser(req, res);
      res.status(HttpStatusCode.OK).json(accessToken);
    } catch (error) {
      console.log('🚀 ~ file: auth.ts:55 ~ requestRefreshTokenForUser: ~ error:', error);
      next(error);
    }
  },

  // REQUEST REFRESH TOKEN FOR CUSTOMER
  requestRefreshTokenForCustomer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = await authService.requestRefreshTokenForCustomer(req, res);
      res.status(HttpStatusCode.OK).json(accessToken);
    } catch (error) {
      console.log('🚀 ~ file: auth.ts:69 ~ requestRefreshTokenForCustomer: ~ error:', error);
      next(error);
    }
  },

  // LOGOUT
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { message } = await authService.logout(res);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
