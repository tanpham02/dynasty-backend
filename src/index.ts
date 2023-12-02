import express, { Application } from 'express';
import 'module-alias/register';
import { configApp, configServer, configSwagger } from '@app/configs';
import connection from '@app/connection';
import { routesMapping } from './routes';

const app: Application = express();

const { APP_URL, port } = configApp();

// Connect DB
connection();

// Config Server
configServer(app);

// Config Swagger
configSwagger(app);

// Routes
routesMapping(app);

app.listen(port, () => {
  console.log(`Server is running at ${APP_URL}`);
});
