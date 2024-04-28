/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { configApp } from '@app/configs';
import { HttpStatusCode, Role, Staff } from '@app/types';

interface StaffRequest extends Request {
  staff?: Staff;
}

const verifyToken = (req: StaffRequest, res: Response, next: NextFunction) => {
  const token = req?.headers?.authorization ?? '';
  console.log('🚀 ~ verifyToken ~ token:', token);
  const { STAFF_JWT_ACCESS_KEY } = configApp();
  if (token) {
    const accessToken = token.split(' ')[1];
    verify(accessToken, STAFF_JWT_ACCESS_KEY, (err, staff) => {
      if (err) {
        return res.status(HttpStatusCode.FORBIDDEN).json('Token is invalid!');
      }
      res.setHeader('Authorization', token);
      req.staff = staff as Staff;
      next();
    });
  } else {
    res.status(HttpStatusCode.UN_AUTHORIZED).json("You're not authenticated");
  }
};

const verifyTokenAndRolePermission = (req: StaffRequest, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.staff?.role === Role.ADMIN) {
      res.status(HttpStatusCode.FORBIDDEN).json({ message: "You're not allow delete this staff" });
    } else {
      next();
    }
  });
};

export { verifyToken, verifyTokenAndRolePermission };
