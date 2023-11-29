import { Exception } from '@app/exception';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import UserModel from '@app/models/user';
import UserService from '@app/services/user';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const userService = new UserService(UserModel, 'user');

const userController = {
  // SEARCH PAGINATION
  search: async (req: Request, res: Response) => {
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
      console.log('🚀 ~ file: user.ts:26 ~ search: ~ error:', error);
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error?.message);
    }
  },

  // CREATE USER
  create: async (req: Request, res: Response) => {
    try {
      const result = await userService.createOverriding(req);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      console.log('🚀 ~ file: user.ts:36 ~ create: ~ error:', error);
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // UPDATE USER
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const { message } = await userService.updateOverriding(id, req);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // GET USER BY ID
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await userService.getByIdOverriding(id);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },

  // GET USER BY ID
  delete: async (req: Request, res: Response) => {
    const { ids } = req.query;
    try {
      const { message } = await userService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error.message);
      }
      res.status(HttpStatusCode.INTERNAL_SERVER).json(INTERNAL_SERVER_ERROR_MSG);
    }
  },
};

export default userController;
