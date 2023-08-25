import { Params } from '@app/types';
import { Document, Error, Model, ObjectId } from 'mongoose';
import { Request } from 'express';

class CRUDService<T extends Document> {
  model: Model<T>;
  nameService: String;
  constructor(model: Model<T>, nameService: String) {
    this.model = model;
    this.nameService = nameService;
  }

  // SEARCH PAGINATION
  async getPagination(params: Params) {
    try {
      const { pageIndex, pageSize, name } = params;
      const searchPatter = name ? new RegExp(name, 'i') : new RegExp('', 'i');
      const data = await this.model
        .find({ name: searchPatter })
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
  async getById(id: string, populateName?: string | string[]) {
    try {
      const category = await this.model.findById(id).populate(populateName || '');
      return category;
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when find by id ${this.nameService} with ${error}`);
    }
  }

  // UPDATE
  async update(id: string, req: Request) {
    console.log('🚀  id:', id);
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
