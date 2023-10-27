import { Model } from 'mongoose';
import CRUDService from '@app/services/crudService';
import { Customer } from '@app/models/customer/@type';
import CustomerAddressModel from '@app/models/customerAddress';
import { Request } from 'express';
import { Filter, Params } from '@app/types';

class CustomerService extends CRUDService<Customer> {
  constructor(model: Model<Customer>, nameService: string) {
    super(model, nameService);
  }
  // SEARCH PAGINATION
  async getPaginationOverriding(params: Params) {
    try {
      const {
        pageIndex,
        pageSize,
        name,
        productId,
        comboPromotionsId,
        categoryId,
        types,
        cityId,
        districtId,
        wardId,
        fullName,
        role,
      } = params;

      const filter: Filter = {};

      if (name) {
        const patternWithName = { $regex: new RegExp(name, 'gi') };
        filter.name = patternWithName;
      }

      if (productId) {
        filter.productIds = productId;
      }

      if (comboPromotionsId) {
        filter.comboPromotionsId = comboPromotionsId;
      }

      if (categoryId) {
        filter.categoryId = categoryId;
      }

      if (types) {
        filter.types = { $all: types?.split(',') };
      }

      if (cityId) {
        filter.cityId = cityId;
      }
      if (districtId) {
        filter.districtId = districtId;
      }
      if (wardId) {
        filter.wardId = wardId;
      }

      if (fullName) {
        const patternWithFullName = { $regex: new RegExp(fullName, 'gi') };
        filter.fullName = patternWithFullName;
      }

      if (role) {
        filter.role = role;
      }

      const data = await this.model
        .find(filter)
        .limit(pageSize)
        .skip(pageSize * pageIndex);

      const totalElement = await this.model.find(filter).count();
      const totalPages = Math.ceil(totalElement / pageSize);
      const isLastPage = pageIndex + 1 >= totalPages;
      const result = {
        data: data.map((item) => {
          const { password, ...remainingCustomer } = item.toObject();

          return remainingCustomer;
        }),
        totalElement,
        pageIndex,
        pageSize,
        totalPage: totalPages,
        isLastPage: isLastPage,
      };
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when fetching ${this.nameService} with ${error}`);
    }
  }
}

export default CustomerService;
