import { Model, Schema } from 'mongoose';

import Exception from '@app/exception';
import { ProductFavoriteModel, ProductModel } from '@app/models';
import { CRUDService } from '@app/services';
import { HttpStatusCode, Params, Product, ProductFavorite } from '@app/types';
import { convertObjectIdToString } from '@app/utils';

class ProductFavoriteService extends CRUDService<ProductFavorite> {
  constructor(model: Model<ProductFavorite>, serviceName: string) {
    super(model, serviceName);
  }

  // SEARCH PAGINATION
  async searchPagination(params: Params) {
    const listResponse: any = await this.getPagination(params);

    if (listResponse.data.length) {
      const { products, ...remain } = listResponse.data[0].toObject();
      const productIds = products!.map((product: Schema.Types.ObjectId) =>
        convertObjectIdToString(product),
      );

      const productList = await ProductModel.find({ _id: { $in: productIds } });

      listResponse.data = [{ ...remain, products: productList }];
    }

    return listResponse;
  }

  // UPDATE
  async updateProductFavorite(customerId: string, productId: string) {
    const productFavorite = await ProductFavoriteModel.findOne({ customerId });

    if (!productFavorite)
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Not found product favorite with customerId');

    return await productFavorite.updateOne(
      {
        $push: {
          products: productId,
        },
      },
      { new: true },
    );
  }

  // DELETE
  async deleteProductFavorite(customerId: string, productId: string) {
    const productFavorite = await ProductFavoriteModel.findOne({ customerId });

    if (!productFavorite)
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Not found product favorite with customerId');

    await productFavorite.updateOne(
      {
        $pull: {
          products: productId,
        },
      },
      { new: true },
    );

    return { message: 'Delete product favorite successfully' };
  }
}

export default ProductFavoriteService;
