/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { verify } from 'jsonwebtoken';
import { configApp } from '@app/configs';
import { NextFunction, Request, Response } from 'express';
import User, { Role } from '@app/models/users/@type';
import { HttpStatusCode } from '@app/exception/type';

interface UserRequest extends Request {
  user?: User;
}

const verifyToken = (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req?.headers?.authorization ?? '';
  const { JWT_ACCESS_KEY } = configApp();
  if (token) {
    const accessToken = token.split(' ')[1];
    verify(accessToken, JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        return res.status(HttpStatusCode.FORBIDDEN).json('Token is invalid!');
      }
      res.setHeader('Authorization', token);
      req.user = user as User;
      next();
    });
  } else {
    res.status(HttpStatusCode.UN_AUTHORIZED).json("You're not authenticated");
  }
};

const verifyTokenAndRolePermission = (req: UserRequest, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user?.role !== Role.ADMIN) {
      res.status(HttpStatusCode.FORBIDDEN).json({ message: "You'er not allow delete this user" });
    } else {
      next();
    }
  });
};

export { verifyToken, verifyTokenAndRolePermission };
