import axios, { AxiosRequestConfig } from 'axios';
import { NextFunction } from 'express';
import https from 'https';

const googleService = {
  getCustomerInfo: async (token: string, next: NextFunction) => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      baseURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return axios(config)
      .then((res) => res.data)
      .catch((err) => next(err));
  },
};

export default googleService;
