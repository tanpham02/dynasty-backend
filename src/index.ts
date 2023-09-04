import express, { Application } from 'express';
import 'module-alias/register';
import { configApp, configServer, configSwagger } from '@app/configs';
import connection from '@app/connection';
import { categoryRouter, productRouter, productVariantRouter, shopSystemRouter } from '@app/routes';
import {
  CATEGORY_ROUTES,
  PRODUCT_ROUTES,
  PRODUCT_VARIANT_ROUTES,
  SHOP_SYSTEM_ROUTES,
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
app.use(`${CATEGORY_ROUTES}`, categoryRouter);

// PRODUCT
app.use(`${PRODUCT_ROUTES}`, productRouter);

// PRODUCT VARIANT
app.use(`${PRODUCT_VARIANT_ROUTES}`, productVariantRouter);

//SHOP SYSTEM
app.use(`${SHOP_SYSTEM_ROUTES}`, shopSystemRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
