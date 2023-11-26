const express = require('express');
const router = express.Router();

// Rota para obter informações do usuário
router.get('/users', (req, res) => {
  // O objeto req.userLogged agora contém as informações do usuário decodificadas pelo middleware
  const user = req.userLogged;

  // Você pode acessar as informações do usuário e fazer o que for necessário
  console.log('controller', user);

  // Enviar uma resposta com as informações do usuário
  res.json({ user });
});

// Rota para atualizar um usuário
router.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Lógica para atualizar o usuário com o ID fornecido
  console.log(`Atualizando usuário com ID ${userId}`);
  return res.json({ mensagem: `Usuário com ID ${userId} atualizado` });
});

// Exporta o router para ser utilizado em outros arquivos
module.exports = router;
