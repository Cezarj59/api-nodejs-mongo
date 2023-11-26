const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API',
      version: '1.0.0',
      description: 'Documentação da Minha API',
    },
  },
  // Caminho para os arquivos com as rotas da sua aplicação
  apis: [path.resolve(__dirname, 'src/**/*.js')],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
