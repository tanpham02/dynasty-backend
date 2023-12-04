import { configApp } from '@app/configs';
import { Exception } from '@app/exception';
import { HttpStatusCode, INTERNAL_SERVER_ERROR_MSG } from '@app/exception/type';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Exception) {
    return res.status(err.status).json(err.message);
  } // Log the error stack trace

  res.status(HttpStatusCode.INTERNAL_SERVER).json({
    error: err?.message || INTERNAL_SERVER_ERROR_MSG,
  });
};
