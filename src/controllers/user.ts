import UserModel from '@app/models/user';
import UserService from '@app/services/user';
import { Params } from '@app/types';
import { Request, Response } from 'express';

const userService = new UserService(UserModel, 'user');

const userController = {
  // SEARCH PAGINATION
  search: async (req: Request, res: Response) => {
    const { pageIndex, pageSize, name } = req.query;
    try {
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
        name: name?.toString(),
      };
      const voucher = await userService.getPagination(params);
      res.status(200).json(voucher);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default userController;
