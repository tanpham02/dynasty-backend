import 'module-alias/register';
import express, { Application } from 'express';
import { configApp, configServer, configSwagger } from '@app/configs';
import connection from '@app/connection';
import { routesMapping } from './routes';

const app: Application = express();

const { APP_URL, PORT } = configApp();

// Connect DB
connection();

// Server Config
configServer(app);

// Swagger Config
configSwagger(app);

// Routes
routesMapping(app);

app.listen(PORT, () => {
  console.log(`Server is running at ${APP_URL}`);
});
