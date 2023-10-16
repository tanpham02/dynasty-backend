import { Model } from 'mongoose';
import { Material } from '@app/models/material/@type';
import CRUDService from './crudService';
import { Request } from 'express';

class MaterialService extends CRUDService<Material> {
  constructor(model: Model<Material>, nameService: string) {
    super(model, nameService);
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
