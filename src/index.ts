import express, { Application } from 'express';
import http from 'http';
import 'module-alias/register';
import { CorsOptions } from 'cors';

import { configApp, configServer, configSwagger } from '@app/configs';
import { connectDatabase, connectSocketIO } from '@app/connection';
import { routesMapping } from './routes';

const app: Application = express();

const { APP_URL, PORT, FRONT_END_URL } = configApp();

const corsConfig: CorsOptions = {
  origin: [FRONT_END_URL, 'http://localhost:1311'],
  optionsSuccessStatus: 200,
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
};
const server = http.createServer(app);

// CONNECTION
connectDatabase();
connectSocketIO(server, corsConfig);

// CONFIG SERVER
configServer(app, corsConfig);

// CONFIG SWAGGER
configSwagger(app);

// ROUTES
routesMapping(app);

server.listen(PORT, () => {
  console.log(`Server is running at ${APP_URL}`);
  console.log(`Swagger's url: ${APP_URL}/dynasty-pizza/documentation`);
});
