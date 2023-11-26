const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const UserModel = require('../models/User');
const moment = require('moment');

/**
 * @swagger
 * /cadastro:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     ...
 */

// Função para exibir data no fuso horário local
function exibirDataNoFusoHorarioLocal(data) {
  // Certifique-se de que a data está em um formato válido
  const dataValida = moment(data)

  if (!dataValida.isValid()) {
    return 'Data inválida'
  }

  // Exibe a data no fuso horário local
  return dataValida.local().format('DD-MM-YYYY HH:mm:ss')
}

// Função para gerar token de autenticação
const generateToken = (user = {}) => {
  return jwt.sign({
    id: user.id, nome: user.nome, email: user.email
  }, authConfig.secret, {
    expiresIn: 1800
  })
}

// Rota para cadastrar um novo usuário
router.post('/cadastro', async (req, res) => {
  try {
    const user = await UserModel.create(req.body)

    return res.json({
      id: user._id,
      data_criacao: exibirDataNoFusoHorarioLocal(user.data_criacao),
      data_atualizacao: exibirDataNoFusoHorarioLocal(user.data_atualizacao),
      ultimo_login: user.ultimo_login || 'Usuario ainda não fez o Login',
      token: generateToken(user)
    })
  } catch (error) {
    console.error(error)

    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      // E-mail duplicado
      return res.status(400).json({
        menssagem: 'E-mail já existente.'
      })
    } else {
      // Erro interno do servidor
      return res.status(500).json({
        menssagem: 'Erro interno do servidor.'
      })
    }
  }
})

// Rota para realizar login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body

  const user = await UserModel.findOne({ email }).select('+senha')

  if (!user) {
    // Usuário não encontrado
    return res.status(400).json({
      mensagem: 'Usuário e/ou senha inválidos'
    })
  }

  if (!await bcrypt.compare(senha, user.senha)) {
    // Senha inválida
    return res.status(401).json({
      mensagem: 'Usuário e/ou senha inválidos'
    })
  }


  // Atualizar o último login
  await user.atualizarUltimoLogin()

  // Remover a senha antes de enviar a resposta
  user.senha = undefined

  return res.json({
    id: user._id,
    data_criacao: exibirDataNoFusoHorarioLocal(user.data_criacao),
    data_atualizacao: exibirDataNoFusoHorarioLocal(user.data_atualizacao),
    ultimo_login: exibirDataNoFusoHorarioLocal(user.ultimo_login) || 'Usuário ainda não fez o Login',
    token: generateToken(user)
  })
})

// Rota para alterar um usuário
router.put('/users/:userId', async (req, res) => {
  const userId = req.params.userId
  const { nome, email, telefone } = req.body

  try {
    // Encontrar o usuário pelo ID
    const user = await UserModel.findById(userId)

    if (!user) {
      // Usuário não encontrado
      return res.status(404).json({ mensagem: 'Usuário não encontrado' })
    }

    // Atualizar apenas os campos presentes no corpo da requisição
    if (nome) {
      user.nome = nome
    }

    if (email) {
      // Verificar se o novo e-mail já existe
      const emailExistente = await UserModel.findOne({ email })
      if (emailExistente && emailExistente._id.toString() !== userId) {
        return res.status(400).json({ mensagem: 'E-mail já cadastrado' })
      }
      user.email = email
    }

    if (telefone) {
      user.telefone = telefone
    }

    // Atualizar a data de atualização
    user.data_atualizacao = new Date()

    // Salvar as alterações
    await user.save()

    return res.json({
      mensagem: 'Usuário atualizado com sucesso',
      id: user._id,
      data_criacao: exibirDataNoFusoHorarioLocal(user.data_criacao),
      data_atualizacao: exibirDataNoFusoHorarioLocal(user.data_atualizacao),
      ultimo_login: exibirDataNoFusoHorarioLocal(user.ultimo_login) || 'Usuário ainda não fez o Login',
      token: generateToken(user)
    })
  } catch (error) {
    // Erro ao atualizar usuário
    return res.status(500).json({ mensagem: 'Falha ao atualizar dados do usuario' })
  }
})

// Exportar o router
module.exports = router

