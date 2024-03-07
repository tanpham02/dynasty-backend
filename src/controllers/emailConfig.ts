/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FIELDS_NAME } from '@app/constants';
import { HttpStatusCode } from '@app/exception/type';
import EmailConfigModel from '@app/models/emailConfig';
import EmailConfigService from '@app/services/emailConfig';
import { NextFunction, Request, Response } from 'express';

const emailConfigService = new EmailConfigService(EmailConfigModel, 'email config');

const emailConfigController = {
  // SEARCH ALL
  searchAll: async (__req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await emailConfigService.findAll();
      res.status(HttpStatusCode.OK).json(category.length ? category[0] : []);
    } catch (error) {
      next(error);
    }
  },

  // CREATE CATEGORY
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await emailConfigService.create(req, FIELDS_NAME.EMAIL_CONFIG);
      res.status(HttpStatusCode.OK).json(category);
    } catch (error) {
      next(error);
    }
  },

  // UPDATE CATEGORY
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await emailConfigService.update(id, req, FIELDS_NAME.EMAIL_CONFIG);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // DELETE CATEGORY
  deleteCategory: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { message } = await emailConfigService.deleteOne(id);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default emailConfigController;
