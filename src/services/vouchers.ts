import Voucher from '@app/models/vouchers/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import { Request } from 'express';
import { ProductStatus } from '@app/constants';

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
      dataRequest.status = ProductStatus.INACTIVE;
    }

    if (startDate <= currentDateTime && endDate > currentDateTime) {
      dataRequest.status = ProductStatus.ACTIVE;
    }

    if (startDate > currentDateTime && endDate > currentDateTime) {
      dataRequest.status = ProductStatus.INCOMING;
    }

    const newVoucher = new this.model(dataRequest);

    return await newVoucher.save();
  }
}

export default VoucherService;
