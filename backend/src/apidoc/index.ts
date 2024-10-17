

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Habra Lekce API',
      version: '0.2.0',
    },
  },
  apis: ['src/apidoc/*.yaml' ], 
};


export function initApiDocs(app) {
  const openapiSpecification = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
}

