import { Application } from 'express';

import authRouter from './auth.route';
import bannerRoute from './banners.route';
import cartRouter from './carts.route';
import categoryRouter from './category.route';
import comboPromotionsRouter from './combo-promotions.route';
import customerAddressRouter from './customer-address.route';
import customerRouter from './customers.route';
import emailConfigRoute from './email-config.route';
import emailTemplateRoute from './email-template.route';
import mailerRoute from './mailer.route';
import materialRouter from './materials.route';
import orderRouter from './orders.route';
import productAttributeRoute from './product-attributes.route';
import productVariantRouter from './product-variants.route';
import productRouter from './products.route';
import promotionsRouter from './promotions.route';
import staffRouter from './staff.route';
import storeConfigRoute from './store-config.route';
import storeSystemRoute from './store-system.route';
import voucherRouter from './vouchers.route';

import {
  AUTH_URL,
  BANNERS_URL,
  CART_URL,
  CATEGORY_URL,
  COMBO_PROMOTIONS_URL,
  CUSTOMER_ADDRESS_URL,
  CUSTOMER_URL,
  EMAIL_CONFIG_URL,
  EMAIL_TEMPLATE_URL,
  MAILER_URL,
  MATERIAL_URL,
  ORDER_URL,
  PRODUCT_ATTRIBUTE_URL,
  PRODUCT_URL,
  PRODUCT_VARIANT_URL,
  PROMOTIONS_URL,
  STAFF_URL,
  STORE_CONFIG_URL,
  STORE_SYSTEM_URL,
  VOUCHER_URL,
} from '@app/constants/apiUrl';

export const routesMapping = (app: Application) => {
  const routesData = [
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
      route: productVariantRouter,
    },
    {
      path: COMBO_PROMOTIONS_URL,
      route: comboPromotionsRouter,
    },
    {
      path: PROMOTIONS_URL,
      route: promotionsRouter,
    },
    {
      path: STAFF_URL,
      route: staffRouter,
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
      path: CUSTOMER_ADDRESS_URL,
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
    {
      path: STORE_CONFIG_URL,
      route: storeConfigRoute,
    },
    {
      path: STORE_SYSTEM_URL,
      route: storeSystemRoute,
    },
  ];

  return routesData.map(({ path, route }) => app.use(`/api/${path}`, route));
};
