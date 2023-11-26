const express = require('express')
const swaggerUi = require('swagger-ui-express')
const specs = require('../swagger-config')
const bodyParser = require('body-parser')

const AuthController = require("./controllers/AuthController")
const AdminController = require("./controllers/AdminController")

const authenticateMiddleware = require("./middlewares/authenticate")

const app = express()

// Adicione o middleware do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware para aceitar apenas dados JSON nas requisições
app.use(express.json())

// Rotas relacionadas à autenticação
app.use('/auth', AuthController)

// Rotas relacionadas à administração, com autenticação obrigatória
app.use('/admin', authenticateMiddleware, AdminController)

// Inicia o servidor na porta 3001
app.listen(3001, () => {
    console.log("Server is running on port 3001")
});


// Middleware para lidar com rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({
        error: true,
        message: 'Endpoint não encontrado. Verifique a URL solicitada.',
    });
});

