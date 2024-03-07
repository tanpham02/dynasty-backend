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
          url: `${APP_URL}`,
        },
      ],

      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header',
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    apis: ['src/routes/*.ts', 'src/routes/**.ts', 'src/models/*/*.ts', 'src/models/*/**.ts'],
  };

  const specs = swaggerJsdoc(options);
  app.use('/dynasty-pizza/documentation', swaggerUi.serve, swaggerUi.setup(specs));
};

export default configSwagger;
