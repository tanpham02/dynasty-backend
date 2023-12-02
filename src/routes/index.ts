import categoryRouter from './category';
import productRouter from './product';
import shopSystemRouter from './shopSystem';
import comboPromotionsRouter from './comboPromotions';
import promotionsRouter from './promotions';
import configStoreRouter from './configStore';
import voucherRouter from './voucher';
import userRouter from './user';
import customerAddressRouter from './customerAddress';
import customerRouter from './customer';
import cartRouter from './cart';
import authRouter from './auth';
import orderRouter from './order';
import materialRouter from './material';
import { Application } from 'express';

import {
  CATEGORY_URL,
  PRODUCT_URL,
  COMBO_PROMOTIONS_URL,
  CONFIG_STORE_URL,
  PROMOTIONS_URL,
  SHOP_SYSTEM_URL,
  USER_URL,
  VOUCHER_URL,
  CUSTOMER_URL,
  CART_URL,
  AUTH_URL,
  ORDER_URL,
  MATERIAL_URL,
} from '@app/services/apiUrl';

export const routesMapping = (app: Application) => {
  const routesData = [
    {
      path: CATEGORY_URL,
      route: categoryRouter,
    },
    {
      path: PRODUCT_URL,
      route: productRouter,
    },
    {
      path: SHOP_SYSTEM_URL,
      route: shopSystemRouter,
    },
    {
      path: COMBO_PROMOTIONS_URL,
      route: comboPromotionsRouter,
    },
    {
      path: CONFIG_STORE_URL,
      route: configStoreRouter,
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
  ];

  routesData.forEach(({ path, route }) => app.use(`${path}`, route));
};
