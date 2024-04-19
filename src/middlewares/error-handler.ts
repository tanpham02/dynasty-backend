/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import Exception from '@app/exception';
import { INTERNAL_SERVER_ERROR_MSG } from '@app/constants';
import { HttpStatusCode } from '@app/types';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof Exception) {
    return res.status(err.status).json(err.message);
  }

  res.status(HttpStatusCode.INTERNAL_SERVER).json({
    error: err?.message || INTERNAL_SERVER_ERROR_MSG,
  });
};
