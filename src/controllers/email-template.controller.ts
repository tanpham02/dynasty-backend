/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { EmailTemplateModel } from '@app/models';
import { EmailTemplateService } from '@app/services';
import { HttpStatusCode } from '@app/types';

const emailTemplateService = new EmailTemplateService(EmailTemplateModel, 'email template');

const emailTemplateController = {
  // SEARCH
  searchAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const emailConfig = await emailTemplateService.findAll();
      res.status(HttpStatusCode.OK).json(emailConfig);
    } catch (error) {
      next(error);
    }
  },

  // CREATE
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const emailConfig = await emailTemplateService.create(req);
      res.status(HttpStatusCode.OK).json(emailConfig);
    } catch (error) {
      next(error);
    }
  },

  // GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const emailConfig = await emailTemplateService.getById(id);
      res.status(HttpStatusCode.OK).json(emailConfig);
    } catch (error) {
      next(error);
    }
  },

  // UPDATE
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await emailTemplateService.update(id, req);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // DELETE
  deleteOne: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { message } = await emailTemplateService.delete(id);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default emailTemplateController;
