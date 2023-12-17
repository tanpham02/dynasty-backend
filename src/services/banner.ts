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

class BannerService extends CRUDService<Banner> {
  constructor(model: Model<Banner>, nameService: string) {
    super(model, nameService);
  }

  // CREATE
  async createOverriding(req: Request, fieldName: string) {
    const files = req.files as Array<Request['file']>;
    let bannersDTO: Banner[] = req.body?.[fieldName].map((item: string) => JSON.parse(item));
    bannersDTO.forEach((bannerDTO, index) => {
      (async () => {
        const newBanner = new this.model({
          ...bannerDTO,
          banner: `/${files[index]?.destination}/${files[index]?.filename}`,
        });

        await newBanner.save();
      })();
    });
    return { message: 'Add banner success' };
  }

  // UPDATE
  async updateOverriding(id: string, req: Request, fieldName: string) {
    const files = req.files as Array<Request['file']>;
    const banner = await this.getById(id);
    let newData: Banner = JSON.parse(req.body?.[fieldName]);

    if (!banner) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'Not found banner');
      throw exception;
    }

    if (files?.[0]?.destination && files?.[0]?.filename) {
      newData.banner = `/${files[0]?.destination}/${files[0]?.filename}`;
    }

    await banner.updateOne(newData, { new: true });

    return { message: 'Update banner success' };
  }
}

export default BannerService;
