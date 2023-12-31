import categoryRouter from './category';
import productRouter from './products';
import comboPromotionsRouter from './comboPromotions';
import promotionsRouter from './promotions';
import voucherRouter from './vouchers';
import userRouter from './users';
import customerAddressRouter from './customerAddress';
import customerRouter from './customers';
import cartRouter from './carts';
import authRouter from './auth';
import orderRouter from './orders';
import materialRouter from './materials';
import productAttributeRoute from './productAttributes';
import productVariantRoute from './productVariants';
import bannerRoute from './banners';
import storeSystemRoute from './storeSystem';
import storeConfigRoute from './storeConfig';
import storeInformationRoute from './storeInformation';
import termAndPolicyRoute from './termAndPolicy';
import statisticRoute from './statistics';
import { Application } from 'express';

import {
  CATEGORY_URL,
  PRODUCT_URL,
  PRODUCT_ATTRIBUTE_URL,
  PRODUCT_VARIANT_URL,
  COMBO_PROMOTIONS_URL,
  PROMOTIONS_URL,
  USER_URL,
  VOUCHER_URL,
  CUSTOMER_URL,
  CART_URL,
  AUTH_URL,
  ORDER_URL,
  MATERIAL_URL,
  BANNERS_URL,
  STORE_SYSTEM_URL,
  STORE_CONFIG_URL,
  STORE_INFORMATION_URL,
  TERM_AND_POLICY_URL,
  STATISTIC_URL,
} from '@app/services/apiUrl';

export const routesMapping = (app: Application) => {
  const routesData = [
    {
      path: STATISTIC_URL,
      route: statisticRoute,
    },
    {
      path: CATEGORY_URL,
      route: categoryRouter,
    },
    {
      path: BANNERS_URL,
      route: bannerRoute,
    },
    {
      path: PRODUCT_URL,
      route: productRouter,
    },
    {
      path: PRODUCT_ATTRIBUTE_URL,
      route: productAttributeRoute,
    },
    {
      path: PRODUCT_VARIANT_URL,
      route: productVariantRoute,
    },
    {
      path: STORE_SYSTEM_URL,
      route: storeSystemRoute,
    },
    {
      path: STORE_INFORMATION_URL,
      route: storeInformationRoute,
    },
    {
      path: COMBO_PROMOTIONS_URL,
      route: comboPromotionsRouter,
    },
    {
      path: STORE_CONFIG_URL,
      route: storeConfigRoute,
    },
    {
      path: PROMOTIONS_URL,
      route: promotionsRouter,
    },
    {
      path: USER_URL,
      route: userRouter,
    },
    {
      path: VOUCHER_URL,
      route: voucherRouter,
    },
    {
      path: CUSTOMER_URL,
      route: customerRouter,
    },
    {
      path: CUSTOMER_URL,
      route: customerAddressRouter,
    },
    {
      path: CART_URL,
      route: cartRouter,
    },
    {
      path: AUTH_URL,
      route: authRouter,
    },
    {
      path: ORDER_URL,
      route: orderRouter,
    },
    {
      path: MATERIAL_URL,
      route: materialRouter,
    },
    {
      path: TERM_AND_POLICY_URL,
      route: termAndPolicyRoute,
    },
  ];

  return routesData.map(({ path, route }) => app.use(path, route));
};
