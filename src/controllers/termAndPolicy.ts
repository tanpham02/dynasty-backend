/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FIELDS_NAME } from '@app/constants';
import { HttpStatusCode } from '@app/exception/type';
import TermAndPolicyModel from '@app/models/termAndPolicy';
import TermAndPolicyService from '@app/services/termAndPolicy';
import { NextFunction, Request, Response } from 'express';

const termAndPolicyService = new TermAndPolicyService(TermAndPolicyModel, 'term and policy');

const termAndPolicyController = {
  //SEARCH ALL
  searchAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const termAndPolicy = await termAndPolicyService.findAll();
      res.status(HttpStatusCode.OK).json(termAndPolicy);
    } catch (error) {
      next(error);
    }
  },

  //CREATE
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const termAndPolicy = await termAndPolicyService.create(req, FIELDS_NAME.TERM_AND_POLICY);
      res.status(HttpStatusCode.OK).json(termAndPolicy);
    } catch (error) {
      next(error);
    }
  },

  //UPDATE
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { message } = await termAndPolicyService.update(id, req, FIELDS_NAME.TERM_AND_POLICY);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error: any) {
      next(error);
    }
  },

  //GET BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const termAndPolicy = await termAndPolicyService.getById(id);
      res.status(HttpStatusCode.OK).json(termAndPolicy);
    } catch (error) {
      next(error);
    }
  },

  // DELETE
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      const { message } = await termAndPolicyService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default termAndPolicyController;
