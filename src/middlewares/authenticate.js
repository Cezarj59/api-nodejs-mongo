const path = require('path');
const authConfig = require('../config/auth.json')

const jwt = require('jsonwebtoken')

// Middleware de autenticação para proteger rotas
module.exports = (req, res, next) => {
  // Obtém o token de autorização do cabeçalho da requisição
  const authHeader = req.headers.authorization

  // Verifica se o token está presente no cabeçalho
  if (!authHeader) {
    return res.status(401).json({
      mensagem: 'Não autorizado'
    })
  }

  // Divide o cabeçalho para obter a parte do token
  const parts = authHeader.split(' ')

  // Verifica se o token está no formato correto
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      mensagem: 'Não autorizado'
    })
  }

  // Obtém o token da parte extraída do cabeçalho
  const token = parts[1]

  // Verifica a validade do token utilizando a chave secreta
  return jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      // Trata erros de validação do token
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          mensagem: 'Sessão inválida'
        })
      }

      return res.status(401).json({
        mensagem: 'Não autorizado'
      })
    }

    // Se o token for válido, armazena as informações do usuário decodificadas no objeto de requisição
    req.userLogged = decoded

    // Chama o próximo middleware ou rota
    return next()
  })
}
