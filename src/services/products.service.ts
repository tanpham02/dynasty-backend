/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { isEmpty, isEqual, uniq } from 'lodash';
import { Model } from 'mongoose';

import { FIELDS_NAME } from '@app/constants';
import Exception from '@app/exception';
import { CategoryModel, ProductAttributeModel, ProductVariantModel } from '@app/models';
import { CRUDService, ProductVariantService } from '@app/services';
import { HttpStatusCode, Product, ProductAttributeItem, ProductVariants } from '@app/types';
import { comparingObjectId, generateUnsignedSlug, handleUploadFile } from '@app/utils';
import { ObjectId } from 'mongodb';
class ProductService extends CRUDService<Product> {
  constructor(model: Model<Product>, serviceName: string) {
    super(model, serviceName);
  }

  // DELETE
  async deleteProduct(ids?: string[] | string | any) {
    const idsValue = Array.isArray(ids) ? ids : [ids];
    if (ids && Array.from(ids).length < 0)
      throw new Exception(HttpStatusCode.BAD_REQUEST, 'ids field is required');

    await this.model.deleteMany({ _id: { $in: idsValue } }, { new: true });

    await ProductVariantModel.deleteMany({ parentId: { $in: idsValue } }, { new: true });

    await CategoryModel.updateMany(
      {
        products: { $in: idsValue },
      },
      { $pull: { products: { $in: idsValue } } },
      { new: true },
    );

    await CategoryModel.updateMany(
      {
        'childrenCategory.category.products': { $in: idsValue },
      },
      {
        $pull: {
          'childrenCategory.category.$.products': { $in: idsValue },
        },
      },
      {
        new: true,
      },
    );

    return { message: `Delete ${this.serviceName} success` };
  }

  // CREATE
  async createProduct(req: Request) {
    const fileUpload = handleUploadFile(req);

    const productBodyRequest: Product = req.body?.[FIELDS_NAME.PRODUCT]
      ? JSON.parse(JSON.parse(JSON.stringify(req.body?.[FIELDS_NAME.PRODUCT])))
      : {};
    const productVariantIds: string[] = [];

    if (fileUpload) {
      productBodyRequest.image = fileUpload;
      productBodyRequest.images = [fileUpload];
    }

    if (!productBodyRequest?.productAttributeList) productBodyRequest.haveProductVariant = false;

    const newProduct = new this.model({
      ...productBodyRequest,
      slug: generateUnsignedSlug(productBodyRequest?.name),
    });

    let productVariants: any[] = [];
    let groupedAttributes: ProductAttributeItem[] = [];

    const mapExtendedIdsToExtendDisplayName = async (extendedIds: string[]) => {
      const attributes = await ProductAttributeModel.find();
      if (isEmpty(attributes) && isEmpty(extendedIds)) return [];
      const extendedName: string[] = [];
      extendedIds?.forEach((id) => {
        attributes?.forEach((attribute) => {
          const attributeChild = attribute?.attributeList?.find((item) =>
            comparingObjectId(id, item._id!),
          );
          if (!isEmpty(attributeChild)) {
            extendedName.push(`${attribute.name}: ${attributeChild.label!}`);
          }
        });
      });
      return extendedName.filter((item) => item !== null);
    };

    const createNewProductVariant = async (productVariant: ProductVariants) => {
      const newProductVariant = new ProductVariantModel(productVariant);
      newProductVariant.productItem?.productAttributeList?.push(newProductVariant._id as any);
      productVariantIds.push(newProductVariant._id);
      await newProductVariant.save();
    };

    if (!isEmpty(productBodyRequest?.productAttributeList)) {
      groupedAttributes = await Promise.all(
        productBodyRequest.productAttributeList!.map(async (attrList) => {
          const { extendedIds = [], priceAdjustmentValues = [] } = attrList;

          const extendedNames = await mapExtendedIdsToExtendDisplayName(extendedIds);
          const extendedDisplayName = !isEmpty(extendedNames)
            ? extendedNames?.map((item) => item?.split(': ')[1])?.join(' - ')
            : undefined;

          return {
            extendedDisplayName,
            extendedNames,
            extendedIds,
            priceAdjustmentValues,
          };
        }),
      );

      if (!isEmpty(groupedAttributes)) {
        productVariants = groupedAttributes.map((groupedAttribute, index) => {
          const priceAdjustment = !isEmpty(groupedAttribute?.priceAdjustmentValues)
            ? groupedAttribute.priceAdjustmentValues?.reduce(
                (acc: any, next: any) => acc + (next ?? 0),
                0,
              )
            : 0;
          const productVariantName = groupedAttribute?.extendedDisplayName
            ? `${productBodyRequest.name} - ${groupedAttribute.extendedDisplayName}`
            : productBodyRequest.name;

          return {
            parentId: newProduct._id,
            attributeUsing: groupedAttribute?.extendedIds,
            variantNames: groupedAttribute?.extendedNames,
            productItem: {
              name: productBodyRequest?.name,
              description: productBodyRequest?.description,
              information: productBodyRequest?.information,
              price: Number(productBodyRequest.price) + priceAdjustment,
              image: productBodyRequest?.image,
              images: productBodyRequest?.images,
              types: productBodyRequest?.types,
              visible: productBodyRequest?.visible || false,
              productAttributeList:
                productBodyRequest?.productAttributeList &&
                productBodyRequest.productAttributeList?.length > 0 &&
                Object.keys(productBodyRequest.productAttributeList[0]).length > 0 &&
                productBodyRequest.productAttributeList[0].extendedIds!.length > 0
                  ? productBodyRequest.productAttributeList[index]
                  : [],
              slug: generateUnsignedSlug(productVariantName),
              haveProductVariant: productBodyRequest.haveProductVariant,
            },
          };
        });
      }
    }
    newProduct.set('productAttributeList', groupedAttributes);

    for (let i = 0; i < productVariants.length; i++) {
      createNewProductVariant(productVariants[i]);
    }
    newProduct.set('productsVariant', productVariantIds);

    const categoryId = productBodyRequest?.categoryId;

    if (categoryId) {
      const category = await CategoryModel.findById(categoryId);

      const categoryChild = await CategoryModel.findOne({
        'childrenCategory.category._id': categoryId,
      });

      if (category) {
        await category.updateOne({ $push: { products: newProduct._id } });
      }

      if (categoryChild) {
        await categoryChild.updateOne(
          {
            $push: {
              'childrenCategory.category.$[item].products': newProduct._id,
            },
          },
          {
            new: true,
            arrayFilters: [
              {
                'item._id': categoryId,
              },
            ],
          },
        );
      }
    }
    return await newProduct.save();
  }

  // UPDATE
  async updateProduct(id: string, req: Request) {
    const fileUpload = handleUploadFile(req);

    const productRecord = await this.getByIdProduct(id);

    if (!productRecord) throw new Exception(404, `Not found product with _id: ${id}`);

    const productBodyRequest: Product = req.body?.[FIELDS_NAME.PRODUCT]
      ? JSON.parse(JSON.parse(JSON.stringify(req.body?.[FIELDS_NAME.PRODUCT])))
      : {};

    const productVariantIds: string[] = [];

    if (fileUpload) {
      productBodyRequest.image = fileUpload;
      productBodyRequest.images = [fileUpload];

      await ProductVariantModel.updateMany(
        { parentId: id },
        {
          $set: {
            'productItem.image': fileUpload,
            'productItem.images': [fileUpload],
          },
        },
        { new: true },
      );
    }

    if (!productBodyRequest?.productAttributeList) productBodyRequest.haveProductVariant = false;
    else productBodyRequest.haveProductVariant = true;

    let groupedAttributes: any[] = [];

    // PRODUCT VARIANTS
    if (
      productBodyRequest?.productAttributeList &&
      productBodyRequest.productAttributeList.length > 0 &&
      productBodyRequest.haveProductVariant
    ) {
      const mapExtendedIdsToExtendDisplayName = async (extendedIds: string[]) => {
        const attributes = await ProductAttributeModel.find();
        if (isEmpty(attributes) && isEmpty(extendedIds)) return [];
        const extendedName: string[] = [];
        extendedIds?.forEach((id) => {
          attributes?.forEach((attribute) => {
            const attributeChild = attribute?.attributeList?.find((item) =>
              comparingObjectId(id, item._id!),
            );
            if (!isEmpty(attributeChild)) {
              extendedName.push(`${attribute.name}: ${attributeChild.label!}`);
            }
          });
        });
        return extendedName.filter((item) => item !== null);
      };

      if (!isEmpty(productBodyRequest?.productAttributeList)) {
        groupedAttributes = await Promise.all(
          productBodyRequest.productAttributeList!.map(async (attrList) => {
            const { extendedIds = [], priceAdjustmentValues = [] } = attrList;

            const extendedNames = await mapExtendedIdsToExtendDisplayName(uniq(extendedIds));
            const extendedDisplayName = !isEmpty(extendedNames)
              ? extendedNames?.map((item) => item?.split(': ')[1])?.join(' - ')
              : undefined;

            return {
              extendedDisplayName,
              extendedNames,
              extendedIds,
              priceAdjustmentValues,
            };
          }),
        );
      }

      productBodyRequest.productAttributeList = groupedAttributes;

      const normalizeToString = (value: any) => {
        if (value instanceof ObjectId) {
          return value.toString();
        }
        return value.toString();
      };

      const areArraysEqual = (arr1: any, arr2: any) => {
        if (arr1.length !== arr2.length) {
          return false;
        }

        const normalizedArr1 = arr1.map(normalizeToString).sort();
        const normalizedArr2 = arr2.map(normalizeToString).sort();

        return isEqual(normalizedArr1, normalizedArr2);
      };

      // UPDATE PRODUCT VARIANT
      const updates = groupedAttributes?.filter((item) => {
        const condition = productRecord?.productsVariant?.some((productVariant) =>
          areArraysEqual(
            (productVariant as unknown as ProductVariants)?.attributeUsing,
            item?.extendedIds,
          ),
        );

        return condition;
      });

      if (!isEmpty(updates)) {
        const dataUpdates = updates?.map((groupedAttribute) => {
          const currentProductVariant = productRecord?.productsVariant?.find((productVariant) =>
            areArraysEqual(
              (productVariant as unknown as ProductVariants)?.attributeUsing,
              groupedAttribute?.extendedIds,
            ),
          );

          const priceAdjustment =
            groupedAttribute?.priceAdjustmentValues?.length > 0
              ? groupedAttribute.priceAdjustmentValues.reduce(
                  (acc: any, next: any) => acc + (next ?? 0),
                  0,
                )
              : 0;

          const productVariantName = groupedAttribute?.extendedDisplayName
            ? `${productBodyRequest.name} - ${groupedAttribute.extendedDisplayName}`
            : productBodyRequest.name;

          return {
            ...(currentProductVariant as any),
            productItem: {
              ...(currentProductVariant as any)?.productItem,
              productAttributeList: [],
              name: productBodyRequest?.name,
              image: productBodyRequest?.image,
              description: productBodyRequest?.description,
              information: productBodyRequest?.information,
              types: productBodyRequest?.types,
              visible: productBodyRequest?.visible,
              haveProductVariant: productBodyRequest.haveProductVariant,
              slug: generateUnsignedSlug(productVariantName),
              price: Number(productBodyRequest.price) + priceAdjustment,
            },
          };
        });

        await Promise.all(
          dataUpdates?.map(async (item) => {
            const id = String(item?._id).toString();

            await ProductVariantModel.updateOne(
              { _id: id },
              {
                $set: {
                  productItem: item?.productItem,
                },
              },
              { new: true },
            );
            productVariantIds.push(id);
          }),
        );
      }

      // CREATE PRODUCT VARIANT
      const creates = groupedAttributes?.filter((item) => {
        const condition = productRecord?.productsVariant?.some((productVariant) =>
          areArraysEqual(
            (productVariant as unknown as ProductVariants)?.attributeUsing,
            item?.extendedIds,
          ),
        );

        return !condition;
      });

      const createProductVariants: any[] = creates?.map((groupedAttribute) => {
        const priceAdjustment =
          groupedAttribute?.priceAdjustmentValues?.length > 0
            ? groupedAttribute.priceAdjustmentValues.reduce(
                (acc: any, next: any) => acc + (next ?? 0),
                0,
              )
            : 0;
        const productVariantName = groupedAttribute?.extendedDisplayName
          ? `${productBodyRequest.name} - ${groupedAttribute.extendedDisplayName}`
          : productBodyRequest.name;

        return {
          parentId: id,
          attributeUsing: groupedAttribute?.extendedIds,
          variantNames: groupedAttribute?.extendedNames,
          productItem: {
            name: productBodyRequest?.name,
            image: productBodyRequest?.image,
            description: productBodyRequest?.description,
            information: productBodyRequest?.information,
            price: Number(productBodyRequest.price) + priceAdjustment,
            types: productBodyRequest?.types,
            visible: productBodyRequest?.visible,
            productAttributeList: [],
            slug: generateUnsignedSlug(productVariantName),
            haveProductVariant: productBodyRequest.haveProductVariant,
          },
        };
      });

      const createNewProductVariant = async (productVariant: ProductVariants) => {
        const newProductVariant = new ProductVariantModel(productVariant);
        productVariantIds.push(newProductVariant._id);
        await newProductVariant.save();
      };

      for (let i = 0; i < createProductVariants.length; i++) {
        createNewProductVariant(createProductVariants[i]);
      }
      productBodyRequest.productsVariant = productVariantIds;
    } else {
      const ids = productRecord?.productsVariant?.map((item: any) => String(item._id).toString());
      await ProductVariantModel?.deleteMany({
        _id: {
          $in: ids,
        },
      });
    }

    // CATEGORY
    if (productBodyRequest?.categoryId) {
      // Cha
      await CategoryModel.updateMany(
        { _id: { $ne: productBodyRequest.categoryId } },
        {
          $pull: {
            products: id,
          },
        },
        { new: true },
      );
      await CategoryModel.updateOne(
        { _id: productBodyRequest.categoryId },
        {
          $push: {
            products: id,
          },
        },
        { new: true },
      );

      // Con
      const childrenCategoryNotEquals = await CategoryModel.find({
        _id: productBodyRequest.categoryId,
      });

      if (childrenCategoryNotEquals && childrenCategoryNotEquals.length) {
        for (const category of childrenCategoryNotEquals) {
          if (
            category?.childrenCategory &&
            Object.keys(category.childrenCategory).length > 0 &&
            category.childrenCategory?.category
          ) {
            for (const cate of category.childrenCategory.category) {
              await category.updateOne(
                {
                  $pull: {
                    'childrenCategory.category.$[item].products': id,
                  },
                },
                {
                  arrayFilters: [
                    {
                      'item._id': cate._id,
                    },
                  ],
                  new: true,
                },
              );
            }
          }
        }
      }

      await CategoryModel.updateOne(
        { 'childrenCategory.category._id': productBodyRequest.categoryId },
        {
          $push: {
            'childrenCategory.category.$.products': id,
          },
        },
        {
          new: true,
        },
      );
    }

    // SLUG
    if (productBodyRequest?.name) {
      productBodyRequest.slug = generateUnsignedSlug(productBodyRequest.name);
    }

    return await this.model.updateOne({ _id: id }, productBodyRequest, { new: true });
  }

  // GET BY ID
  async getByIdProduct(id: string) {
    const result = await this.getById(id, [
      {
        path: 'productsVariant',
        model: 'ProductVariant',
      },
    ]);

    result.categoryIdSelected = result.categoryId;
    const category = await CategoryModel.findOne({
      $or: [
        {
          _id: result.categoryId,
        },
        {
          'childrenCategory.category._id': result.categoryId,
        },
      ],
    });

    result.categoryId = category as any;

    return result;
  }
}

export default ProductService;
