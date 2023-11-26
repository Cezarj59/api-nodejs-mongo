const mongoose = require('mongoose')

// Conectar ao MongoDB utilizando a URL fornecida
mongoose.connect('mongodb+srv://cezarj59:nK38eUPbzMiqsAH3@api-escribo.7mk1jdg.mongodb.net/api-nodejs-mongodb?retryWrites=true&w=majority')
  .then(() => {
    console.log('Conexão com MongoDB estabelecida com sucesso')
  })
  .catch((error) => {
    console.error('Falha ao conectar ao MongoDB')
    console.error(error)
  })

// Configurar o uso de Promises globais para o Mongoose
mongoose.Promise = global.Promise

// Exportar a instância do Mongoose configurada
module.exports = mongoose
