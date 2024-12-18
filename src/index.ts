import { CorsOptions } from 'cors';
import { CronJob } from 'cron';
import express, { Application } from 'express';
import http from 'http';
import 'module-alias/register';

import { configApp, configServer, configSwagger } from '@app/configs';
import { ConnectDatabase, SocketIO } from '@app/connection';
import { errorHandler } from './middlewares';
import { routesMapping } from './routes';

const app: Application = express();

const { APP_URL, PORT, FRONT_END_URL, SWAGGER_ENDPOINT } = configApp();

const corsConfig: CorsOptions = {
  origin: [FRONT_END_URL, 'http://localhost:1311'],
  optionsSuccessStatus: 200,
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
};
const server = http.createServer(app);
export const socketInstance = new SocketIO(server, corsConfig);

// CONNECTION
new ConnectDatabase();

const cronJob = new CronJob(
  '*/1 * * * * *', // cronTime
  function () {
    console.log('🚀 ~ moment.tz.guess():', new Date().getSeconds());
  }, // onTick
);
// cronJob.start();

// CONFIG SERVER
configServer(app, corsConfig);

// CONFIG SWAGGER
configSwagger(app);

// ROUTES
routesMapping(app);

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running at ${APP_URL}`);
  console.log(`Swagger's url: ${APP_URL}${SWAGGER_ENDPOINT}`);
});
