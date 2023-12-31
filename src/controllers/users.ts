/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Exception } from '@app/exception';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import UserModel from '@app/models/users';
import UserService from '@app/services/users';
import { Params } from '@app/types';
import { NextFunction, Request, Response } from 'express';

const userService = new UserService(UserModel, 'user');

const userController = {
  // SEARCH PAGINATION
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex, pageSize, fullName, role } = req.query;

    const params: Params = {
      pageIndex: pageIndex ? Number(pageIndex) : 0,
      pageSize: pageSize ? Number(pageSize) : 10,
      fullName: fullName?.toString(),
      role: role?.toString(),
    };

    try {
      const result = await userService.getPaginationExcludePw(params);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error: any) {
      next(error);
    }
  },

  // CREATE USER
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.createOverriding(req);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  },

  // UPDATE USER
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { message } = await userService.updateOverriding(id?.toString()!, req);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
      console.log('🚀 ~ file: users.ts:49 ~ update: ~ error:', error);
      next();
    }
  },

  // GET USER BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await userService.getByIdOverriding(id);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  },

  // GET USER BY ID
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      const { message } = await userService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
