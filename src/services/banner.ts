/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable prefer-const */
import Banner from '@app/models/banner/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import { Request } from 'express';
import { File } from 'buffer';
import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';
import { JSONCookie } from 'cookie-parser';
import handleUploadFile from '@app/utils/handleUploadFile';
import { TypeUpload } from '@app/types';

class BannerService extends CRUDService<Banner> {
  constructor(model: Model<Banner>, nameService: string) {
    super(model, nameService);
  }

  // CREATE
  async createOverriding(req: Request, fieldName: string) {
    if (req.files) {
      const listFileUploads = handleUploadFile(req, TypeUpload.MULTIPLE);
      if (Array.isArray(req.body?.[fieldName])) {
        (async () => {
          let bannersDTO: Banner[] = req.body?.[fieldName].map((item: string) => JSON.parse(item));
          bannersDTO
            .map((banner, index) => ({
              ...banner,
              url: listFileUploads[index],
            }))
            .forEach(async (item) => {
              const newBanner = new this.model(item);
              await newBanner.save();
            });
        })();
      } else {
        const newData = JSON.parse(req.body?.[fieldName]);
        const newBn = new this.model({ ...newData, url: listFileUploads[0] });
        await newBn.save();
      }

      return { message: 'Add banner success' };
    }
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
