/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable prefer-const */
import { Request } from 'express';
import { Model } from 'mongoose';

import { FIELDS_NAME } from '@app/constants';
import Exception from '@app/exception';
import { CRUDService } from '@app/services';
import { Banner, HttpStatusCode } from '@app/types';
import { handleUploadFile } from '@app/utils';

class BannerService extends CRUDService<Banner> {
  constructor(model: Model<Banner>, serviceName: string) {
    super(model, serviceName);
  }

  // CREATE
  async createBanner(req: Request) {
    const requestBody = req.body?.[FIELDS_NAME.BANNER]
      ? JSON.parse(JSON.parse(JSON.stringify(req.body?.[FIELDS_NAME.BANNER])))
      : {};

    if (req.file) {
      requestBody.url = handleUploadFile(req);
    }
    const newBanner = new this.model(requestBody);
    return await newBanner.save();
  }

  // UPDATE
  async updateBanner(id: string, req: Request) {
    const requestBody = req.body?.[FIELDS_NAME.BANNER]
      ? JSON.parse(JSON.parse(JSON.stringify(req.body?.[FIELDS_NAME.BANNER])))
      : {};
    const banner = await this.getById(id);

    if (!banner) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Not found banner');
      throw exception;
    }
    const newData = requestBody;

    if (req.file) {
      newData.url = handleUploadFile(req);
    }
    return await banner.updateOne(newData, { new: true });
  }
}

export default BannerService;
