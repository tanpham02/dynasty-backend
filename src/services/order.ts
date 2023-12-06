import { Order, StatusOrder } from '@app/models/order/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';
import { Filter, Params } from '@app/types';
import { Request, Response } from 'express';
import VoucherModel from '@app/models/voucher';
import CartModel from '@app/models/cart';
import CartService from './cart';
import { Cart } from '@app/models/cart/@type';
import VoucherService from './voucher';
import CustomerService from './customer';
import CustomerModel from '@app/models/customer';
import ProductModel from '@app/models/product';
import ConfigStoreService from './configStore';
import ConfigStoreModel from '@app/models/configStore';

const customerService = new CustomerService(CustomerModel, 'customer');
const cartService = new CartService(CartModel, 'cart');
const voucherService = new VoucherService(VoucherModel, 'voucher');

const configStoreService = new ConfigStoreService(ConfigStoreModel, 'config store');

class OrderService extends CRUDService<Order> {
  constructor(model: Model<Order>, nameService: string) {
    super(model, nameService);
  }

  //   // SEARCH PAGINATION
  //   async getPaginationOverriding(params: Params) {
  //     try {
  //       const { pageIndex, pageSize, customerId, from, to, statusOrder } = params;

  //       const filter: Filter = {};
  //       if (customerId) {
  //         filter.customerId = customerId;
  //       }
  //       if (from && to) {
  //         filter.createdAt = { $gte: from, $lte: to };
  //       }
  //       if (statusOrder) {
  //         filter.statusOrder = statusOrder;
  //       }
  //       const data = await this.model
  //         .find(filter)
  //         .limit(pageSize)
  //         .skip(pageSize * pageIndex);
  //       const totalElement = await this.model.find(filter).count();
  //       const totalPages = Math.ceil(totalElement / pageSize);
  //       const isLastPage = pageIndex + 1 >= totalPages;
  //       const result = {
  //         data: data.sort(
  //           (a, b) => new Date(b?.createdAt ?? '').getTime() - new Date(a?.createdAt ?? '').getTime(),
  //         ),
  //         totalElement,
  //         pageIndex,
  //         pageSize,
  //         totalPage: totalPages,
  //         isLastPage: isLastPage,
  //       };
  //       return result;
  //     } catch (error) {
  //       console.log(error);
  //       throw new Error(`Occur error when fetching ${this.nameService} with ${error}`);
  //     }
  //   }

  //   // CHECKOUT
  //   async checkout(req: Request, res: Response) {
  //     const customerId = req?.body?.customerId;
  //     let newData = { ...req.body };
  //     try {
  //       if (customerId) {
  //         const productCartQuery: Cart = await cartService.getCartByCustomerId(customerId);
  //         const feeShip = await configStoreService.findAll();
  //         if (productCartQuery) {
  //           const { customerId, ...remainingProductCartQuery } = productCartQuery;
  //           const shipFee = feeShip?.[0]?.feeShip || 0;
  //           newData = {
  //             ...newData,
  //             productFromCart: { ...remainingProductCartQuery },
  //             totalOrderAmountBeforeUseDiscount: remainingProductCartQuery.totalCart,
  //             totalOrder: remainingProductCartQuery.totalCart + shipFee,
  //             shipFee: shipFee,
  //           };
  //         }
  //       }

  //       const newOrder = new this.model(newData);
  //       //   const customer = await customerService.getById(customerId);
  //       //   if (customer) {
  //       //     await customer?.updateOne({ $push: { orderIds: newOrder._id } });
  //       //   }
  //       await newOrder.save();
  //       return newOrder;
  //     } catch (error) {
  //       throw new Error(`Occur error when checkout ${this.nameService}`);
  //     }
  //   }

  //   // QUICK BUY
  //   async quickBuy(req: Request, res: Response) {
  //     try {
  //       const productIdFromCart = req?.body?.productFromCart?.products;

  //       const product = await ProductModel.findById(productIdFromCart?.[0]?.productId);
  //       const feeShip = await configStoreService.findAll();

  //       const newData = {
  //         ...req.body,
  //         productFromCart: {
  //           products: [...productIdFromCart],
  //           totalCart: product?.price,
  //         },
  //         shipFee: feeShip,
  //         totalOrderAmountBeforeUseDiscount: product?.price,
  //         totalOrder: (product?.price || 0) + (feeShip?.[0]?.feeShip || 0),
  //       };

  //       const quickBuyOrder = new this.model(newData);
  //       await quickBuyOrder.save();

  //       return { orderId: quickBuyOrder._id };
  //     } catch (error) {
  //       console.log('🚀 error:', error);
  //       throw new Error(`Occur ${error} when handle quick buy`);
  //     }
  //   }

  //   // UPDATE TOTAL ORDER WHEN USE VOUCHER
  //   async updateTotalOrderWhenUseVoucher(voucherId: string, customerId: string, orderId: string) {
  //     try {
  //       if (voucherId) {
  //         const voucher = await VoucherModel.findById(voucherId);
  //         if (!voucher?.customerIdsUsedVoucher?.includes(customerId)) {
  //           await voucher?.updateOne({
  //             $push: { customerIdsUsedVoucher: customerId },
  //           });
  //         }
  //         const order = await this.model.findOne({ _id: orderId });

  //         if (order && order?.totalOrder && voucher && voucher?.discount) {
  //           await order?.updateOne(
  //             { $set: { totalOrder: order.totalOrder - voucher?.discount, voucherId: voucherId } },
  //             { new: true },
  //           );
  //         }
  //       }
  //     } catch (error) {
  //       throw new Error('Occur error when update total order when use voucher');
  //     }
  //   }

  //   // RE-ORDER
  //   async reorder(orderId: string, customerId: string, req: Request) {
  //     try {
  //       if (orderId) {
  //         const ordered = await this.model
  //           .findById(orderId)
  //           .then((res) => res?.populate('productFromCart.products.productId'));

  //         const cartAfterFindByCustomerId = await CartModel.findOne({ customerId: customerId });
  //         if (ordered) {
  //           const productOrdered = (ordered?.productFromCart as any) || [];
  //           const productInCarted = cartAfterFindByCustomerId?.products || [];

  //           const productOrderedQueryProducts = productOrdered?.products;

  //           const addCartWhenNoExist = async (productIdNotExistInCart?: string) => {
  //             if (productIdNotExistInCart) {
  //               const quantityProdNotExistCart = productOrderedQueryProducts?.find(
  //                 (item: any) => new Object(item.productId._id).valueOf() === productIdNotExistInCart,
  //               );
  //               return await cartAfterFindByCustomerId?.updateOne(
  //                 {
  //                   $push: {
  //                     products: quantityProdNotExistCart,
  //                   },
  //                 },
  //                 { new: true },
  //               );
  //             }

  //             await cartAfterFindByCustomerId?.updateOne(
  //               {
  //                 $set: {
  //                   products: productOrderedQueryProducts,
  //                 },
  //               },
  //               { new: true },
  //             );
  //           };

  //           if (productInCarted.length > 0) {
  //             for (let index = 0; index < productOrderedQueryProducts?.length; index++) {
  //               const elementProductOrdered = productOrderedQueryProducts?.[index];
  //               const convertElementProductOrdered_Id = elementProductOrdered?.productId as any;
  //               const elementProductOrderedId = JSON.parse(
  //                 JSON.stringify(convertElementProductOrdered_Id._id),
  //               );
  //               const quantityProdInCart = await cartAfterFindByCustomerId?.products?.find(
  //                 (item) => new Object(item.productId).valueOf() === elementProductOrderedId,
  //               );
  //               if (quantityProdInCart) {
  //                 (async function () {
  //                   return await CartModel?.updateOne(
  //                     {
  //                       'products.productId': elementProductOrderedId,
  //                     },
  //                     {
  //                       $set: {
  //                         'products.$.quantityProducts':
  //                           elementProductOrdered.quantityProducts +
  //                           quantityProdInCart.quantityProducts,
  //                       },
  //                     },
  //                     { new: true },
  //                   );
  //                 })();
  //               }
  //               if (!quantityProdInCart) {
  //                 addCartWhenNoExist(elementProductOrderedId);
  //               }
  //             }
  //             return;
  //           }
  //           addCartWhenNoExist();
  //         }
  //       }
  //     } catch (error) {
  //       console.log('🚀error:', error);
  //       throw new Error(`Occur ${error} when handle quick buy`);
  //     }
  //   }

  //   // UPDATE STATUS ORDER
  //   async updateStatusOrder(status: StatusOrder, orderId: string) {
  //     try {
  //       if (orderId) {
  //         await this.model.findOneAndUpdate({ _id: orderId }, { $set: { statusOrder: status } });
  //         return {
  //           message: 'Update status order success',
  //           statusCode: 200,
  //         };
  //       }
  //       return {
  //         message: `Not found order with this ${orderId}`,
  //         statusCode: 404,
  //       };
  //     } catch (error) {
  //       throw new Error(`Occur error when change status ${this.nameService}`);
  //     }
  //   }

  //   // GET ORDER BY ID
  //   async getOrderById(orderId: string) {
  //     try {
  //       const order = await this.model
  //         .findById(orderId)
  //         ?.populate('productFromCart.products.productId');

  //       return order;
  //     } catch (error) {
  //       throw new Error('Occur error when retries order');
  //     }
  //   }

  //   // CANCEL ORDER
  //   async cancelOrder(orderId: string, reason: string) {
  //     try {
  //       await this.model.findOneAndUpdate(
  //         {
  //           _id: orderId,
  //         },
  //         {
  //           $set: { reasonCancelOrder: reason, statusOrder: 'CANCELED' },
  //         },
  //         { new: true },
  //       );
  //       return { message: 'In process' };
  //     } catch (error) {
  //       throw new Error('Occur error when send request cancel order');
  //     }
  //   }
}

export default OrderService;
