/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Document, Model } from 'mongoose';

import Exception from '@app/exception';
import { HttpStatusCode } from '@app/types';
import { Filter, Params } from '@app/types/common.types';
import { Request } from 'express';

class CRUDService<T extends Document> {
  protected model: Model<T>;
  protected serviceName: string;
  constructor(model: Model<T>, serviceName: string) {
    this.model = model;
    this.serviceName = serviceName;
  }

  // FIND ALL
  async findAll() {
    const getAll = await this.model.find();
    return getAll;
  }

  // SEARCH PAGINATION
  async getPagination(params: Params) {
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
      from,
      to,
      role,
      sortBy,
      parentId,
      customerId,
      statusOrder,
      customerType,
      isShowHomePage,
      isDefault,
    } = params;

    const filter: Filter = {};
    let sortFieldName: { [key: string]: any } = {};

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

    if (parentId) {
      filter.parentId = parentId;
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

    if (from) {
      filter.importDate = { $gte: from };
      filter.createdAt = { $gte: from };
    }

    if (to) {
      filter.importDate = { $lte: to };
      filter.createdAt = { $lte: to };
    }

    if (from && to) {
      filter.importDate = { $gte: from, $lte: to };
      filter.createdAt = { $gte: from, $lte: to };
    }

    if (customerId) {
      filter.customerId = customerId;
    }

    if (statusOrder) {
      filter.statusOrder = statusOrder;
    }

    if (customerType) {
      filter.customerType = customerType;
    }

    if (isShowHomePage || isShowHomePage === 0) {
      filter.isShowHomePage = Boolean(isShowHomePage);
    }

    if (isDefault) {
      filter.isDefault = Boolean(Number(isDefault));
    }

    if (sortBy) {
      if (Array.isArray(sortBy) && sortBy.length > 0) {
        sortFieldName = sortBy.map((item) => {
          const key = item.split(':')[0];
          const asc = item.split(':')[1];

          return [key, asc];
        });
      } else if (typeof sortBy === 'string') {
        sortFieldName = [[sortBy.split(':')[0], sortBy.split(':')[1]]];
      }
    }

    const data = await this.model
      .find(filter)
      .limit(pageSize)
      .skip(pageSize * pageIndex)
      .sort(sortFieldName);

    const totalElement = (await this.model.find(filter)).length;
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
  }

  // CREATE
  async create(req: Request) {
    const dataRequest = req.body;
    const create = new this.model(dataRequest);
    return await create.save();
  }

  // GET BY ID
  async getById(id: string) {
    const response = await this.model.findById(id);
    if (!response) {
      throw new Exception(HttpStatusCode.NOT_FOUND, `Not found ${this.serviceName}`);
    }
    return response;
  }

  // UPDATE
  async update(id: string, req: Request) {
    const dataUpdate = req.body;
    const stores = (await this.model.findById(id)) as any;

    if (!Object.keys(dataUpdate).length) {
      throw new Exception(HttpStatusCode.BAD_REQUEST, "Request body can't be empty");
    }

    if (!stores) {
      throw new Exception(HttpStatusCode.NOT_FOUND, `${this.serviceName} not found!`);
    }

    Object.keys(dataUpdate).forEach((key) => {
      if (
        dataUpdate[key] !== undefined &&
        (typeof dataUpdate[key] === 'string' || Object.keys(dataUpdate[key]).length < 0) &&
        stores[key] !== dataUpdate[key]
      ) {
        stores[key] = dataUpdate[key];
      } else if (typeof dataUpdate[key] === 'object') {
        Object.keys(dataUpdate[key]).forEach((childrenKey) => {
          if (
            dataUpdate[key][childrenKey] !== undefined &&
            stores[key][childrenKey] !== dataUpdate[key][childrenKey]
          ) {
            stores[key][childrenKey] = dataUpdate[key][childrenKey];
          }
        });
      }
    });

    return await stores.save();
  }

  // DELETE
  async delete(ids: string[] | any) {
    if (!ids) {
      const exception = new Exception(HttpStatusCode.BAD_REQUEST, "ids field can't be empty");
      throw exception;
    }

    if (Array.isArray(ids)) {
      await this.model.deleteMany({
        _id: {
          $in: ids, // $in operator: sẽ tìm bất kì những thằng nào trong database có _id match với những thằng trong list ids truyền vào ($in operator: nhận value[] or value)
        },
      });
    } else {
      await this.model.deleteOne({
        _id: ids,
      });
    }

    return { message: `Delete ${this.serviceName} success` };
  }
}

export default CRUDService;
