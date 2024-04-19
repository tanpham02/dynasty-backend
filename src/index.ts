import express, { Application } from 'express';
import 'module-alias/register';

import { configApp, configServer, configSwagger } from '@app/configs';
import connection from '@app/connection';
import { routesMapping } from './routes';

const app: Application = express();

const { APP_URL, PORT } = configApp();

// CONNECT DB
connection();

// CONFIG SERVER
configServer(app);

// CONFIG SWAGGER
configSwagger(app);

// ROUTES
routesMapping(app);

app.listen(PORT, () => {
  console.log(`Server is running at ${APP_URL}`);
});
