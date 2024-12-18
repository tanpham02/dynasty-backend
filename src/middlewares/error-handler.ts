/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { INTERNAL_SERVER_ERROR_MSG } from '@app/constants';
import Exception from '@app/exception';
import { HttpStatusCode } from '@app/types';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error in handler:', err);
  if (err instanceof Exception) {
    return res.status(err.status).json({
      ...err,
      status: err.status,
      message: err?.message ?? (err as any)?._message,
    });
  }

  res.status(HttpStatusCode.INTERNAL_SERVER).json({
    ...err,
    error: err?.message || INTERNAL_SERVER_ERROR_MSG,
  });
};
