import Voucher from '@app/types/vouchers.type';
import CRUDService from './CRUD.service';
import { Model } from 'mongoose';
import { Request } from 'express';
import { Status } from '@app/types';

class VoucherService extends CRUDService<Voucher> {
  constructor(model: Model<Voucher>, nameService: string) {
    super(model, nameService);
  }

  // CREATE VOUCHER
  async createOverriding(req: Request) {
    const currentDateTime = new Date().getTime();
    const dataRequest: Voucher = req.body;
    const { startDate: startDateRequest, endDate: endDateRequest } = dataRequest;
    const startDate = new Date(startDateRequest).getTime();
    const endDate = new Date(endDateRequest).getTime();
    if (startDate < currentDateTime && endDate < currentDateTime) {
      dataRequest.status = Status.INACTIVE;
    }

    if (startDate <= currentDateTime && endDate > currentDateTime) {
      dataRequest.status = Status.ACTIVE;
    }

    if (startDate > currentDateTime && endDate > currentDateTime) {
      dataRequest.status = Status.INCOMING;
    }

    const newVoucher = new this.model(dataRequest);

    return await newVoucher.save();
  }
}

export default VoucherService;
