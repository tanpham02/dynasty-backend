import { default as categoryRouter } from './category';
import { default as productRouter } from './products';
import { default as comboPromotionsRouter } from './comboPromotions';
import { default as promotionsRouter } from './promotions';
import { default as voucherRouter } from './vouchers';
import { default as userRouter } from './users';
import { default as customerAddressRouter } from './customerAddress';
import { default as customerRouter } from './customers';
import { default as cartRouter } from './carts';
import { default as authRouter } from './auth';
import { default as orderRouter } from './orders';
import { default as materialRouter } from './materials';
import { default as productAttributeRoute } from './productAttributes';
import { default as productVariantRoute } from './productVariants';
import { default as bannerRoute } from './banners';
import { default as storeSystemRoute } from './storeSystem';
import { default as storeConfigRoute } from './storeConfig';
import { default as storeInformationRoute } from './storeInformation';
import { default as termAndPolicyRoute } from './termAndPolicy';
import { default as statisticRoute } from './statistics';
import { default as mailerRoute } from './mail';
import { default as emailConfigRoute } from './emailConfig';
import { default as emailTemplateRoute } from './emailTemplate';
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
  MAILER_URL,
  EMAIL_CONFIG_URL,
  EMAIL_TEMPLATE_URL,
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
    {
      path: MAILER_URL,
      route: mailerRoute,
    },
    {
      path: EMAIL_CONFIG_URL,
      route: emailConfigRoute,
    },
    {
      path: EMAIL_TEMPLATE_URL,
      route: emailTemplateRoute,
    },
  ];

  return routesData.map(({ path, route }) => app.use(path, route));
};
