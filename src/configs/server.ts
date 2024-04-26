import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';

import { errorHandler } from '@app/middlewares';
import { configApp } from '.';

const { FRONT_END_URL } = configApp();

const configServer = (app: Application) => {
  // NOTE: CORS
  const corsConfig = {
    origin: FRONT_END_URL,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsConfig));

  // NOTE: PARSE REQUEST BODY
  app.use(express.json()); // (JSON OBJECT)
  app.use(express.urlencoded({ extended: true })); // (FORM DATA)
  // The `extended: true`: parsing nested objects and arrays
  // The `extended: false`: parsing not complex objects and arrays

  //NOTE: POPULAR HTTP LOGGING LIBRARY
  app.use(morgan('dev'));

  // NOTE: PARSE COOKIE
  app.use(cookieParser()); // retries value from cookie

  // NOTE: LOAD STATIC FILE
  app.use('/public', express.static('public'));

  // NOTE: GLOBAL ERROR - ERROR HANDLER
  app.use(errorHandler);
};

export default configServer;
