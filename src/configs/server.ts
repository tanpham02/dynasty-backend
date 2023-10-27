import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

const configServer = (app: Application) => {
  dotenv.config({ path: '.env.development' });
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  // GET IMAGE FROM URL
  //         URL                                            folder contain image
  app.use('/public/uploads/image/products', express.static('public/uploads/image/products'));
  app.use('/public/uploads/image/users', express.static('public/uploads/image/users'));
  app.use('/public/uploads/image/customers', express.static('public/uploads/image/customers'));

  // app.use('/static', express.static(path.join(__dirname, 'public'))) => Đi từ thư mục src vào
  // app.use('/upload/img', express.static('upload/img'));  => Đi từ thu mục cha vao
};

export default configServer;
