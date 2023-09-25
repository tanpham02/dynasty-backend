import { Request, Response } from 'express';
import authService from '@app/services/auth';

const authController = {
  // SIGNUP CUSTOMER
  signup: async (req: Request, res: Response) => {
    try {
      const { status, customer, errors } = await authService.signup(req, res);
      if (status > 200) {
        return res.status(status).json(errors);
      }
      return res.status(status).json(customer);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // LOGIN FOR USER
  loginUser: async (req: Request, res: Response) => {
    try {
      const response = await authService.loginUser(req, res);
      if (response) {
        if (response.status > 400) {
          return res?.status(response.status).json(response.message);
        }
        return res?.status(response.status).json(response.data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // LOGIN FOR CUSTOMER
  loginCustomer: async (req: Request, res: Response) => {
    try {
      const response = await authService.loginCustomer(req, res);
      if (response) {
        if (response.status > 400) {
          return res?.status(response.status).json(response.message);
        }
        return res?.status(response.status).json(response.data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // REQUEST REFRESH TOKEN FOR USER
  requestRefreshTokenForUser: async (req: Request, res: Response) => {
    try {
      const { data, status } = await authService.requestRefreshTokenForUser(req, res);

      if (status > 400) {
        return res.status(status).json({ message: data.message });
      }
      res.status(status).json({ accessToken: data.accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // REQUEST REFRESH TOKEN FOR CUSTOMER
  requestRefreshTokenForCustomer: async (req: Request, res: Response) => {
    try {
      const { data, status } = await authService.requestRefreshTokenForCustomer(req, res);

      if (status > 400) {
        return res.status(status).json({ message: data.message });
      }
      res.status(status).json({ accessToken: data.accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // LOGOUT
  logout: async (req: Request, res: Response) => {
    try {
      const { message } = await authService.logout(req, res);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default authController;
