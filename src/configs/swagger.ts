import { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { configApp } from '@app/configs';

const configSwagger = (app: Application) => {
  const { APP_URL } = configApp();
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
          url: 'https://dynasty-ws.vtaan.id.vn',
          description: 'Production server',
        },
        {
          url: 'http://localhost:1009',
          description: 'Development server',
        },
        {
          url: 'http://103.163.118.88:2000',
          description: 'Staging server',
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
    apis: [
      'src/routes/*.ts',
      'src/routes/**.ts',
      'src/models/*/*.ts',
      'src/models/*/**.ts',
      'src/types/*.ts',
    ],
  };

  const specs = swaggerJsdoc(options);
  app.use('/dynasty-pizza/documentation', swaggerUi.serve, swaggerUi.setup(specs));
};

export default configSwagger;
