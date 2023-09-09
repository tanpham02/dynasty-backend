import Voucher from '@app/models/voucher/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import { Request } from 'express';
import { Status } from '@app/constants';

class VoucherService extends CRUDService<Voucher> {
  constructor(model: Model<Voucher>, nameService: string) {
    super(model, nameService);
  }

  // CREATE VOUCHER
  async createOverriding(req: Request) {
    const currentDate = new Date().getTime();
    const dataRequest: Voucher = req.body;
    try {
      const { startDate: startDateRequest, endDate: endDateRequest } = dataRequest;
      const startDate = new Date(startDateRequest).getTime();
      const endDate = new Date(endDateRequest).getTime();
      if (startDate < currentDate && endDate < currentDate) {
        dataRequest.status = Status.IN_ACTIVE;
      }

      if (startDate <= currentDate && endDate > currentDate) {
        dataRequest.status = Status.ACTIVE;
      }

      if (startDate > currentDate && endDate > currentDate) {
        dataRequest.status = Status.IN_COMING;
      }

      const newVoucher = new this.model(dataRequest);

      return await newVoucher.save();
    } catch (error) {
      throw new Error(`Occur error when create ${this.nameService}`);
    }
  }
}

export default VoucherService;
