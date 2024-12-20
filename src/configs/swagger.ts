import { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { configApp } from '@app/configs';
import { MODE } from '@app/types';

const { APP_URL, SWAGGER_ENDPOINT } = configApp();

const configSwagger = (app: Application) => {
  let descServer = 'Development server';
  switch (process.env.NODE_ENV) {
    case MODE.STAGING:
      descServer = 'Staging server';
      break;
    case MODE.PRODUCTION:
      descServer = 'Production server';
      break;

    default:
      break;
  }

  const options = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Swagger Dynasty Pizza',
        version: '1.0.0',
        description:
          'This is a simple API application made with NodeJS + Express and documented with Swagger',
        license: {
          name: 'MIT',
          url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
          name: 'Pham Van Tan',
          email: 'phamvantan1311@gmail.com',
        },
      },
      servers: [
        {
          url: APP_URL,
          description: descServer,
        },
      ],

      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            in: 'header',
            description: 'The token for authentication',
            bearerFormat: 'JWT',
          },
          // NOTE: Apply when security is specified
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      // NOTE: Apply for security globally
      //   security: [
      //     {
      //       bearerAuth: [],
      //     },
      //   ],
    },
    apis: ['src/routes/*.ts', 'src/routes/**.ts', 'src/documentation/*.ts'],
  };

  const specs = swaggerJsdoc(options);
  app.use(SWAGGER_ENDPOINT, swaggerUi.serve as any, (swaggerUi as any).setup(specs));
};

export default configSwagger;
