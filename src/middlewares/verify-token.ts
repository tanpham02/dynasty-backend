/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';
import { verify, decode } from 'jsonwebtoken';

import { configApp } from '@app/configs';
import { HttpStatusCode, Role, Staff } from '@app/types';
import { FIELDS_NAME } from '@app/constants';

interface StaffRequest extends Request {
  staff?: Staff;
}

const verifyToken = (req: StaffRequest, res: Response, next: NextFunction) => {
  const token = req?.headers?.authorization ?? '';
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
    const token = req?.headers?.authorization?.split(' ')[1] ?? '';
    const decodeData = decode(token) as { role: Role; id: string };
    if (decodeData?.role !== Role.ADMIN && req.params?.id !== decodeData?.id) {
      res
        .status(HttpStatusCode.FORBIDDEN)
        .json({ message: "You're not allow edit or delete this staff" });
    } else {
      next();
    }
  });
};

export { verifyToken, verifyTokenAndRolePermission };
