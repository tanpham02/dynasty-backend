import { Filter, Params } from '@app/types';
import { Document, Error, Model } from 'mongoose';
import { Request } from 'express';

class CRUDService<T extends Document> {
  protected model: Model<T>;
  protected nameService: String;
  constructor(model: Model<T>, nameService: String) {
    this.model = model;
    this.nameService = nameService;
  }

  // FIND ALL
  async findAll() {
    try {
      const getAll = await this.model.find();
      return getAll;
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when find all ${this.nameService} with ${error}`);
    }
  }

  // SEARCH PAGINATION
  async getPagination(params: Params) {
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
        from,
        to,
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
        data,
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

  // CREATE
  async create(req: Request) {
    try {
      const create = new this.model(req.body);
      return await create.save();
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when create ${this.nameService} with ${error}`);
    }
  }

  // GET BY ID
  async getById(id: string) {
    try {
      const category = await this.model.findById(id);
      return category;
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when find by id ${this.nameService} with ${error}`);
    }
  }

  // UPDATE
  async update(id: string | any, req: Request) {
    try {
      const category = await this.model.findByIdAndUpdate(id, req.body, { new: true });
      return category;
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when update ${this.nameService} with ${error}`);
    }
  }

  // DELETE
  async delete(ids: string[] | any) {
    console.log(typeof ids);
    try {
      await this.model.deleteMany({
        _id: {
          $in: ids, // $in operator: sẽ tìm bất kì những thằng nào trong database có _id match với nhứng thằng trong list id truyền vào ($in operator: nhận value[] or value)
        },
      });

      return { message: `Delete ${this.nameService} success` };
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when update ${this.nameService} with ${error}`);
    }
  }
}

export default CRUDService;
