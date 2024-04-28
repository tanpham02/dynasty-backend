/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { configApp } from '@app/configs';
import { HttpStatusCode, Role, Staff } from '@app/types';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface StaffRequest extends Request {
  user?: Staff;
}

const verifyToken = (req: StaffRequest, res: Response, next: NextFunction) => {
  const token = req?.headers?.authorization ?? '';
  const { STAFF_JWT_ACCESS_KEY } = configApp();
  if (token) {
    const accessToken = token.split(' ')[1];
    verify(accessToken, STAFF_JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        return res.status(HttpStatusCode.FORBIDDEN).json('Token is invalid!');
      }
      res.setHeader('Authorization', token);
      req.user = user as Staff;
      next();
    });
  } else {
    res.status(HttpStatusCode.UN_AUTHORIZED).json("You're not authenticated");
  }
};

const verifyTokenAndRolePermission = (req: StaffRequest, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user?.role !== Role.ADMIN) {
      res.status(HttpStatusCode.FORBIDDEN).json({ message: "You'er not allow delete this user" });
    } else {
      next();
    }
  });
};

export { verifyToken, verifyTokenAndRolePermission };
