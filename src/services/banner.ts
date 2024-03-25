/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable prefer-const */
import { Request } from 'express';
import { Model } from 'mongoose';

import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';
import Banner from '@app/models/banners/@type';
import { TypeUpload } from '@app/types';
import handleUploadFile from '@app/utils/handleUploadFile';
import CRUDService from './crudService';

class BannerService extends CRUDService<Banner> {
  constructor(model: Model<Banner>, nameService: string) {
    super(model, nameService);
  }

  // CREATE
  async createOverriding(req: Request, fieldName: string) {
    const requestBody = req.body?.[fieldName];

    if (Array.isArray(requestBody) && requestBody.length > 0) {
      let bannersDTO: Banner[] = requestBody.map((item: string) => JSON.parse(item));
      (async () => {
        bannersDTO
          .map((banner) => banner)
          .forEach(async (item, index) => {
            if (req.files) {
              const listFileUploads = handleUploadFile(req, TypeUpload.MULTIPLE);
              item.url = listFileUploads[index];
            }
            const newBanner = new this.model(item);
            console.log('🚀 ~ BannerService ~ .forEach ~ newBanner:', newBanner);
            await newBanner.save();
          });
      })();
    } else {
      const newData = JSON.parse(requestBody);

      if (req.files) {
        const listFileUploads = handleUploadFile(req, TypeUpload.MULTIPLE);
        newData.url = listFileUploads[0];
      }
      const newBn = new this.model(newData);
      await newBn.save();
    }

    return { message: 'Add banner success' };
  }

  // UPDATE
  async updateOverriding(id: string, req: Request, fieldName: string) {
    const files = req.files as Array<Request['file']>;

    const banner = await this.getById(id);

    if (!banner) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Banner not found');
      throw exception;
    }
    let newData = { url: '' };

    if (req.body?.[fieldName] && Object.keys(req.body[fieldName]).length > 0) {
      newData = {
        ...newData,
        ...JSON.parse(req.body?.[fieldName]),
        url: banner.url,
      };
    }

    if (!banner) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Not found banner');
      throw exception;
    }

    if (files) {
      const filesHandler = handleUploadFile(req, TypeUpload.MULTIPLE);
      newData.url = filesHandler[0];
    }

    await banner.updateOne(newData, { new: true });

    return { message: 'Update banner success' };
  }
}

export default BannerService;
