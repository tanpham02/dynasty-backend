import { verify } from 'jsonwebtoken';
import { configApp } from '@app/configs';
import { NextFunction, Request, Response } from 'express';
import User, { Role } from '@app/models/user/@type';

interface UserRequest extends Request {
  user?: User;
}

const verifyToken = (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req?.headers?.authorization ?? '';
  const { jwtAccessKey } = configApp();
  if (token) {
    const accessToken = token.split(' ')[1];
    verify(accessToken, jwtAccessKey ?? '', (err, user) => {
      if (err) {
        return res.status(403).json('Token is not valid!');
      }
      res.setHeader('Authorization', token);
      req.user = user as User;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};

const verifyTokenAndAuthenRole = (req: UserRequest, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user?.role !== Role.ADMIN) {
      res.status(403).json({ message: "You'er not allow delete this user" });
    } else {
      next();
    }
  });
};

export { verifyToken, verifyTokenAndAuthenRole };
