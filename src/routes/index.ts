import { default as categoryRouter } from './category.route';
import { default as productRouter } from './products.route';
import { default as comboPromotionsRouter } from './combo-promotions.route';
import { default as promotionsRouter } from './promotions.route';
import { default as voucherRouter } from './vouchers.route';
import { default as staffRouter } from './staff.route';
import { default as customerAddressRouter } from './customer-address.route';
import { default as customerRouter } from './customers.route';
import { default as cartRouter } from './carts.route';
import { default as authRouter } from './auth.route';
import { default as orderRouter } from './orders.route';
import { default as materialRouter } from './materials.route';
import { default as productAttributeRoute } from './product-attributes.route';
import { default as bannerRoute } from './banners.route';
import { default as termAndPolicyRoute } from './term-and-policy.route';
import { default as mailerRoute } from './mail.route';
import { default as emailConfigRoute } from './email-config.route';
import { default as emailTemplateRoute } from './email-template.route';
import { default as productVariantRouter } from './product-variants.route';
import { Application } from 'express';

import {
  CATEGORY_URL,
  PRODUCT_URL,
  PRODUCT_ATTRIBUTE_URL,
  PRODUCT_VARIANT_URL,
  COMBO_PROMOTIONS_URL,
  PROMOTIONS_URL,
  STAFF_URL,
  VOUCHER_URL,
  CUSTOMER_URL,
  CART_URL,
  AUTH_URL,
  ORDER_URL,
  MATERIAL_URL,
  BANNERS_URL,
  TERM_AND_POLICY_URL,
  MAILER_URL,
  EMAIL_CONFIG_URL,
  EMAIL_TEMPLATE_URL,
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

  return routesData.map(({ path, route }) => app.use(`/api/${path}`, route));
};
