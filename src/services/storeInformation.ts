/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import StoreInformationModel from '@app/models/storeInformation';
import StoreInformation from '@app/models/storeInformation/@type';
import { TypeUpload } from '@app/types';
import handleUploadFile from '@app/utils/handleUploadFile';
import { Request } from 'express';
import { Model } from 'mongoose';
import CRUDService from './crudService';

class StoreInformationService extends CRUDService<StoreInformation> {
  constructor(model: Model<StoreInformation>, nameService: string) {
    super(model, nameService);
  }

  // CREATE
  async createOverriding(req: Request, fieldName: string) {
    const storeInfo = await this.create(req, fieldName);

    if (storeInfo && req.file && Object.keys(req.file).length > 0) {
      const logo = handleUploadFile(req, TypeUpload.ONE);
      await StoreInformationModel.updateOne(
        { _id: storeInfo._id },
        {
          $set: {
            brandLogo: logo[0],
          },
        },
        { new: true },
      );

      return { message: 'Add store information success' };
    }
  }

  // UPDATE
  async updateOverriding(id: string, req: Request, fieldName: string) {
    const storeInfo = await this.update(id, req, fieldName);

    if (storeInfo && req.file && Object.keys(req.file).length > 0) {
      const logo = handleUploadFile(req, TypeUpload.ONE);
      await StoreInformationModel.updateOne(
        { _id: id },
        {
          $set: {
            brandLogo: logo[0],
          },
        },
        { new: true },
      );

      return { message: 'Add store information success' };
    }
  }
}

export default StoreInformationService;
