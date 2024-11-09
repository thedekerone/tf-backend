import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express,Router } from 'express';

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Your API description',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/tf-backend',
      description: 'Development server',
    },
    {
      url: 'https://velvetlettr.com/tf-backend/',
      description: 'Production server',
    },
  ],

  apis: ['./src/docs/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Router) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

