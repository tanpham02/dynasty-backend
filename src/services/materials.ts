import { Model } from 'mongoose';
import { Material } from '@app/models/materials/@type';
import CRUDService from './crudService';
import { Request } from 'express';
import { Filter, Params } from '@app/types';

class MaterialService extends CRUDService<Material> {
  constructor(model: Model<Material>, nameService: string) {
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

      if (from && to) {
        filter.importDate = { $gte: from, $lte: to };
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

  // CREATE MATERIAL
  async createOverriding(req: Request) {
    const bodyRequest: Material = req.body;
    try {
      const totalPrice = bodyRequest.materialInfo?.reduce((acc, next) => {
        const quantityConvert = next?.quantity?.includes('kg')
          ? next?.quantity?.split('kg')?.[0]
            ? Number(next?.quantity?.split('kg')?.[0])
            : 0
          : next?.quantity
            ? Number(next?.quantity)
            : 0;

        return acc + (next?.price || 0) * quantityConvert;
      }, 0);
      const newMaterial = new this.model({ ...bodyRequest, totalPrice });
      await newMaterial.save();
      return newMaterial;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  // DELETE MATERIAL
  async deleteOverriding(materialId: string) {
    try {
      const material = await this.model.findOne({
        $or: [{ _id: materialId }, { 'materialInfo._id': materialId }],
      });

      const materialIdFromDb = new Object(material?._id).valueOf();
      if (materialId === materialIdFromDb) {
        return await this.model.findOneAndDelete({ _id: materialId });
      }

      return await this.model.findOneAndUpdate(
        { 'materialInfo._id': materialId },
        {
          $pull: { materialInfo: { _id: materialId } },
        },
        { new: true },
      );
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default MaterialService;
