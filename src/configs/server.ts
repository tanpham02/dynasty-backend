import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

const configServer = (app: Application) => {
  dotenv.config({ path: '.env.development' });
  app.use(
    cors({
      origin: [`${process.env.FRONTEND_URL}`],
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
};

export default configServer;
