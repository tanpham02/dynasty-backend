import express, { Application } from 'express';
import 'module-alias/register';
import { configApp, configServer, configSwagger } from '@app/configs';
import connection from '@app/connection';
import {
  categoryRouter,
  comboPromotionsRouter,
  productRouter,
  productVariantRouter,
  promotionsRouter,
  shopSystemRouter,
  configStoreRouter,
  voucherRouter,
  userRouter,
  customerAddressRouter,
  customerRouter,
} from '@app/routes';
import {
  CATEGORY_URL,
  COMBO_PROMOTIONS_URL,
  CONFIG_STORE_URL,
  PRODUCT_URL,
  PRODUCT_VARIANT_URL,
  PROMOTIONS_URL,
  SHOP_SYSTEM_URL,
  USER_URL,
  VOUCHER_URL,
  CUSTOMER_URL,
} from './services/apiUrl';

const app: Application = express();

const { port } = configApp();

// Connect DB
connection();

// Config Server
configServer(app);

// Config Swagger
configSwagger(app);

// Routes
// CATEGORY
app.use(`${CATEGORY_URL}`, categoryRouter);

// PRODUCT
app.use(`${PRODUCT_URL}`, productRouter);

// PRODUCT VARIANT
app.use(`${PRODUCT_VARIANT_URL}`, productVariantRouter);

//SHOP SYSTEM
app.use(`${SHOP_SYSTEM_URL}`, shopSystemRouter);

// COMBO PROMOTIONS
app.use(`${COMBO_PROMOTIONS_URL}`, comboPromotionsRouter);

// PROMOTIONS
app.use(`${PROMOTIONS_URL}`, promotionsRouter);

// CONFIG STORE
app.use(`${CONFIG_STORE_URL}`, configStoreRouter);

// VOUCHER
app.use(`${VOUCHER_URL}`, voucherRouter);

// USER
app.use(`${USER_URL}`, userRouter);

// CUSTOMER
app.use(`${CUSTOMER_URL}`, customerAddressRouter);
app.use(`${CUSTOMER_URL}`, customerRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
