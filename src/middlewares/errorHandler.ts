import { configApp } from '@app/configs';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const server = http.createServer(express());
  // IGNORE EXCEPTION
  server.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err}`);

    server.close((err) => {
      console.log('🚀 ~ file: server.ts:50 ~ err:', err);
      return;
    });
    //process.exit(1);
  });

  server.on('uncaughtexception', function (err) {
    console.error(`Uncaught Exception: ${err}`);
    server.close((err) => {
      console.log('🚀 ~ file: server.ts:50 ~ err:', err);
      return;
    });
    //process.exit(1);
  });

  next();
};
