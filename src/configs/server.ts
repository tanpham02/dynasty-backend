import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const configServer = (app: Application, corsConfig: CorsOptions) => {
  app.use(cors(corsConfig));

  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );

  app.use(express.json()); // (JSON OBJECT)
  app.use(express.urlencoded({ extended: true })); // (FORM DATA)
  // The `extended: true`: parsing nested objects and arrays
  // The `extended: false`: parsing not complex objects and arrays

  app.use(morgan('dev'));

  //   app.use(cookieParser()); // retries value from cookie

  app.use('/public', express.static('public'));
};

export default configServer;
