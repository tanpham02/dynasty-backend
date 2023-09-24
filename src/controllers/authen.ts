import { Request, Response } from 'express';
import authenService from '@app/services/authen';

const authenController = {
  // LOGIN
  login: async (req: Request, res: Response) => {
    try {
      const response = await authenService.login(req, res);
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

  // REQUEST REFRESH TOKEN
  requestRefreshToken: async (req: Request, res: Response) => {
    try {
      const { data, status } = await authenService.requestRefreshToken(req, res);

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
      const { message } = await authenService.logout(req, res);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default authenController;
