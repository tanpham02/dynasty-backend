import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import cookieParser from 'cookie-parser';
import { errorHandler } from '@app/middlewares/errorHandler';
import { Exception } from '@app/exception';

const configServer = (app: Application) => {
  dotenv.config({ path: '.env.development' });
  app.use(
    cors({
      origin: 'http://localhost:3001',
      optionsSuccessStatus: 200,
    }),
  );

  app.use(express.json()); // JSON OBJECT
  app.use(express.urlencoded({ extended: true })); //FALSE: application/x-www-form-urlencoded | TRUE: combines the 2 above

  app.use(morgan('dev'));
  app.use(cookieParser()); // retries value from cookie

  // GET IMAGE FROM URL
  //         URL                                            folder contain image
  app.use('/public/uploads/image/products', express.static('public/uploads/image/products'));
  app.use('/public/uploads/image/users', express.static('public/uploads/image/users'));
  app.use('/public/uploads/image/customers', express.static('public/uploads/image/customers'));
  // app.use('/static', express.static(path.join(__dirname, 'public'))) => Đi từ thư mục src vào
  // app.use('/upload/img', express.static('upload/img'));  => Đi từ thu mục root vao

  // GLOBAL ERROR
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Exception) {
      return res.status(err.status).json(err.message);
    } // Log the error stack trace

    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: INTERNAL_SERVER_ERROR_MSG,
    });
  });

  // ERROR HANDLER (Avoid crash app)
  app.use(errorHandler);
};

export default configServer;
