import { ProductVariants } from '@app/models/productVariant/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import { Params } from '@app/types';

class ProductVariantService extends CRUDService<ProductVariants> {
  constructor(model: Model<ProductVariants>, nameService: string) {
    super(model, nameService);
  }
  // SEARCH PAGINATION - Overriding
  async getPagination(params: Params) {
    try {
      const { pageIndex, pageSize } = params;
      const data = await this.model
        .find()
        .limit(pageSize)
        .skip(pageSize * pageIndex);
      const totalElement = await this.model.count();
      const result = {
        data,
        totalElement,
        pageIndex,
        pageSize,
        totalPage: Math.ceil(totalElement / pageSize),
        isLastPage: pageIndex === totalElement,
      };
      console.log('result', result);
      return result;
    } catch (error) {
      throw new Error(`Occur error when fetching ${this.nameService} with ${error}`);
    }
  }
}

export default ProductVariantService;
