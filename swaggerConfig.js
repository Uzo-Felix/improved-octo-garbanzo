const swaggerJSDoc = require('swagger-jsdoc');

const appUrl = process.env.APP_URL || 'http://localhost:5000';
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HNG11 API',
      version: '1.0.0',
      description: 'API documentation for the HNG11 project',
    },
    servers: [
      {
        url: appUrl,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
