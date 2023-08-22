import express, { Application } from 'express';
import 'module-alias/register';
import { configApp, configServer, configSwagger } from '@app/configs';
import connection from '@app/connection';
import { categoryRouter } from '@app/routes';
import { CATEGORY_ROUTES } from './services/apiUrl';

const app: Application = express();

const { port } = configApp();

// Connect DB
connection();

// Config Server
configServer(app);

// Config Swagger
configSwagger(app);

// Routes
app.use(`${CATEGORY_ROUTES}`, categoryRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
