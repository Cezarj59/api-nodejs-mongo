// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();
const mongoose = require('mongoose')

// Conectar ao MongoDB utilizando a URL fornecida
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conexão com MongoDB estabelecida com sucesso');
  })
  .catch((error) => {
    console.error('Falha ao conectar ao MongoDB');
    console.error(error);
  });


// Configurar o uso de Promises globais para o Mongoose
mongoose.Promise = global.Promise

// Exportar a instância do Mongoose configurada
module.exports = mongoose
