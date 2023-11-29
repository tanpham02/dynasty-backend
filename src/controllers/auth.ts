import { Request, Response } from 'express';
import authService from '@app/services/auth';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import { Exception } from '@app/exception';

const authController = {
  // SIGNUP CUSTOMER
  signup: async (req: Request, res: Response) => {
    try {
      const { message } = await authService.signup(req, res);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      console.log('🚀 ~ file: auth.ts:13 ~ signup: ~ error:', error);
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // LOGIN FOR USER
  loginUser: async (req: Request, res: Response) => {
    try {
      const response = await authService.loginUser(req, res);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log('🚀 ~ file: auth.ts:27 ~ loginUser: ~ error:', error);
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // LOGIN FOR CUSTOMER
  loginCustomer: async (req: Request, res: Response) => {
    try {
      const response = await authService.loginCustomer(req, res);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log('🚀 ~ file: auth.ts:41 ~ loginCustomer: ~ error:', error);
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // REQUEST REFRESH TOKEN FOR USER
  requestRefreshTokenForUser: async (req: Request, res: Response) => {
    try {
      const { accessToken } = await authService.requestRefreshTokenForUser(req, res);
      res.status(HttpStatusCode.OK).json(accessToken);
    } catch (error) {
      console.log('🚀 ~ file: auth.ts:55 ~ requestRefreshTokenForUser: ~ error:', error);
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // REQUEST REFRESH TOKEN FOR CUSTOMER
  requestRefreshTokenForCustomer: async (req: Request, res: Response) => {
    try {
      const { accessToken } = await authService.requestRefreshTokenForCustomer(req, res);
      res.status(HttpStatusCode.OK).json(accessToken);
    } catch (error) {
      console.log('🚀 ~ file: auth.ts:69 ~ requestRefreshTokenForCustomer: ~ error:', error);
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // LOGOUT
  logout: async (res: Response) => {
    try {
      const { message } = await authService.logout(res);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },
};

export default authController;
