import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { HttpStatusCode } from '@app/exception/type';
import cookieParser from 'cookie-parser';

const configServer = (app: Application) => {
  dotenv.config({ path: '.env.development' });
  app.use(
    cors({
      origin: 'http://localhost:3001',
      optionsSuccessStatus: 200,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(cookieParser()); // retries value from cookie

  // GET IMAGE FROM URL
  //         URL                                            folder contain image
  app.use('/public/uploads/image/products', express.static('public/uploads/image/products'));
  app.use('/public/uploads/image/users', express.static('public/uploads/image/users'));
  app.use('/public/uploads/image/customers', express.static('public/uploads/image/customers'));

  // app.use('/static', express.static(path.join(__dirname, 'public'))) => Đi từ thư mục src vào
  // app.use('/upload/img', express.static('upload/img'));  => Đi từ thu mục root vao

  // Global errors
  //   app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  //     console.error(err.stack); // Log the error stack trace

  //     res.status(HttpStatusCode.INTERNAL_SERVER).json({
  //       error: 'Internal Server Error',
  //     });
  //   });
};

export default configServer;
