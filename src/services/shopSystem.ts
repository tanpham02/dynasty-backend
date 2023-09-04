import { Model } from 'mongoose';
import CRUDService from './crudService';
import ShopSystem from '@app/models/shopSystem/@type';
import { Filter, Params } from '@app/types';

class ShopSystemClass extends CRUDService<ShopSystem> {
  constructor(model: Model<ShopSystem>, nameService: string) {
    super(model, nameService);
  }

  async searchPagination(params: Params) {
    try {
      const { pageIndex, pageSize, name, address } = params;

      const filter: Filter = {};

      if (name) {
        const patternWithName = { $regex: new RegExp(name, 'gi') };
        filter.name = patternWithName;
      }

      if (address) {
        const patternWithAddress = { $regex: new RegExp(address, 'gi') };
        filter.address = patternWithAddress;
      }

      const data = await this.model
        .find(filter)
        .limit(pageSize)
        .skip(pageSize * pageIndex);
      const totalElement = await this.model.count();
      const totalPages = Math.ceil(totalElement / pageSize);
      const isLastPage = pageIndex + 1 >= totalPages;
      const result = {
        data,
        totalElement,
        pageIndex,
        pageSize,
        totalPage: totalPages,
        isLastPage: isLastPage,
      };
      return result;
    } catch (error) {
      throw new Error();
    }
  }
}

export default ShopSystemClass;
