/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FIELDS_NAME } from '@app/constants';
import { HttpStatusCode } from '@app/exception/type';
import EmailConfigModel from '@app/models/emailConfig';
import EmailConfigService from '@app/services/emailConfig';
import { Params } from '@app/types';
import { NextFunction, Request, Response } from 'express';

const emailConfigService = new EmailConfigService(EmailConfigModel, 'email config');

const emailConfigController = {
  // SEARCH
  searchPagination: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex, pageSize, isDefault } = req.query;
    try {
      const params: Params = {
        pageIndex: pageIndex ? Number(pageIndex) : 0,
        pageSize: pageSize ? Number(pageSize) : 10,
        isDefault: isDefault?.toString(),
      };
      const emailConfig = await emailConfigService.getPagination(params);
      res.status(HttpStatusCode.OK).json(emailConfig);
    } catch (error) {
      next(error);
    }
  },

  // GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const emailConfig = await emailConfigService.getById(id);
      res.status(HttpStatusCode.OK).json(emailConfig);
    } catch (error) {
      next(error);
    }
  },

  // CREATE
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const emailConfig = await emailConfigService.create(req, FIELDS_NAME.EMAIL_CONFIG);
      res.status(HttpStatusCode.OK).json(emailConfig);
    } catch (error) {
      next(error);
    }
  },

  // UPDATE
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await emailConfigService.update(id, req, FIELDS_NAME.EMAIL_CONFIG);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      const { message } = await emailConfigService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default emailConfigController;
